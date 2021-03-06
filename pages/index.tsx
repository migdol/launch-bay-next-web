import { actions, helpers } from 'lbn-core';
import {
  addSquadron,
  renameSquadron,
  setUpgrade,
} from 'lbn-core/dist/actions/squadrons';
import { importAllSync } from 'lbn-core/dist/actions/sync';
import { userDidLogin } from 'lbn-core/dist/actions/user';
import { usedSquadronXWS } from 'lbn-core/dist/helpers/unique';
import {
  getUpgrades,
  shipTypeOptions,
  upgradesForSlot,
} from 'lbn-core/dist/loader';
import { UserState } from 'lbn-core/dist/reducers/user';
import requests from 'lbn-core/dist/requests';
import { AppState } from 'lbn-core/dist/state';
import { Format, Ship, ShipType, Slot, Upgrade } from 'lbn-core/dist/types';
import { NextApiRequest, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, Store } from 'redux';
import { v4 as uuid } from 'uuid';
import { Layout } from '../components/layout';
import { Notification } from '../components/notification';
import { PilotPopover } from '../components/popover/pilot';
import { ShipPopover } from '../components/popover/ship';
import { UpgradePopover } from '../components/popover/upgrade';
import { TagComponent } from '../components/tag';
import { copyToClipboard } from '../helpers/clipboard';
import { useSquadronXWS } from '../helpers/hooks';
import { wrapper } from '../store';

const { squadrons } = actions;
const { convert, importExport, serializer, unit, i18n } = helpers;
const { useLocalized } = i18n;

const {
  addShipAction,
  changePilotAction,
  copyShip,
  importSquadron,
  removeShip,
  toggleFormat,
} = squadrons;
const { deserialize, serialize } = serializer;
const { keyFromSlot } = convert;
const { exportAsText, exportAsTTS, exportAsXws } = importExport;
const { loadSquadron } = unit;

export type DataItem = {
  type: 'Ship' | 'Upgrade' | 'Empty' | 'SlotOptions';
  key: string;
  slot: Slot;
  index: number;
  slotIndex?: number;
  ship?: Ship;
  upgrade?: Upgrade;
  title?: string;
  slotOptions?: Slot[];
};

type BidStatistics = {
  format: Format;
  listpoints: number;
  initiative: number;
  meaningful: number;
  movelast: number;
};

type Props = {
  uid: string;
  cookies: { [key: string]: string };
  stats: BidStatistics[];
  foundOnServer: boolean;
};

const EditPage: NextPage<Props> = ({ uid, cookies, stats }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector<AppState, UserState>((s) => s.app.user);
  const { t, c } = useLocalized(user.language);

  const { lbx } = router.query;
  const xws = useSquadronXWS(uid);
  const squadron = loadSquadron(xws);
  const collection = useSelector<AppState, any>((s) => s.app.collection);

  const [shipBase, setShipBase] = useState<ShipType>();
  const [rowLayout, setRowLayout] = useState(cookies['rowLayout'] === 'true');
  const [notificationTitle, setNotificationTitle] = useState<string>();
  const [notificationMessage, setNotificationMessage] = useState<string>();

  // const [onServer, setOnServer] = useState(foundOnServer);
  const usedXws = usedSquadronXWS(squadron);

  const p: { [s: string]: Slot } = {};
  squadron?.ships.forEach((s) => {
    const u = s.ability?.slotOptions?.find(
      (sl) => s.upgrades?.[keyFromSlot(sl)]
    );
    u && (p[s.uid] = u);
  });

  useEffect(() => {
    if (!xws || xws?.uid !== uid) {
      return;
    }

    const newLbx = serialize(xws);
    if (decodeURIComponent(newLbx) !== lbx) {
      const url = `?lbx=${newLbx}&uid=${uid}`;
      router.push(url, `?lbx=${newLbx}`, { shallow: true });

      // Om vi är inloggade, uppdatera på servern
      // lbx är inte satt när vi först laddar en sparad lista
      if (!user.jwt || !lbx) {
        // if (!user.jwt || !lbx || !onServer) {
        return;
      }
      // console.log('Update server', { newLbx, lbx });
      const run = async () => requests.setSquadron(xws, user);
      run();
    } else {
    }
  }, [xws]);

  if (!xws || !squadron) {
    return null;
  }

  const { faction, format } = squadron;

  const actions: {
    title: string;
    className?: string;
    onClick: () => void;
  }[] = [
    {
      title: 'XWS',
      onClick: () => {
        copyToClipboard(exportAsXws(squadron));
        setNotificationTitle('XWS data copied to clipboard');
      },
    },
    {
      title: 'TTS',
      onClick: () => {
        copyToClipboard(exportAsTTS(squadron, t));
        setNotificationTitle('TTS data copied to clipboard');
      },
    },
    {
      title: 'As text',
      onClick: () => {
        copyToClipboard(exportAsText(squadron, t));
        setNotificationTitle('Plaint text copied to clipboard');
      },
    },
  ];

  return (
    <Layout
      squadron={squadron}
      onChangeName={(n) => dispatch(renameSquadron(squadron.uid, n))}
      onChangeFormat={() => dispatch(toggleFormat(squadron.uid))}
      onPrint={() =>
        xws && window.open(`/print?lbx=${serialize(xws)}`, '_ blank')
      }
      rowLayout={rowLayout}
      setRowLayout={(v) => {
        setRowLayout(v);
        setCookie(null, 'rowLayout', `${v}`, {});
      }}
      actions={actions}
    >
      <div className="mb-2 text-gray-400 flex flew-wrap items-center">
        {squadron.tags?.map((tag) => (
          <TagComponent key={tag} label={tag} />
        ))}
      </div>

      {/* {!onServer && user.jwt && <div>Save button</div>} */}

      <div
        className={`flex flex-1 flex-col grid grid-cols-1 ${
          !rowLayout && 'sm:grid-cols-2'
        } gap-x-3 gap-y-3`}
      >
        {squadron.ships.map((s) => {
          const showHardpointPicker =
            s.ability?.slotOptions &&
            !s.ability?.slotOptions.find((sl) => s.upgrades?.[keyFromSlot(sl)]);

          const hardpointOptions = () => [
            ...upgradesForSlot(
              squadron,
              s,
              'Cannon',
              collection,
              { t, c },
              true
            ),
            ...upgradesForSlot(
              squadron,
              s,
              'Missile',
              collection,
              { t, c },
              true
            ),
            ...upgradesForSlot(
              squadron,
              s,
              'Torpedo',
              collection,
              { t, c },
              true
            ),
          ];

          const upgrades = getUpgrades(format, s);
          const bidInfo = stats.find(
            (stat) =>
              stat.format === squadron.format &&
              stat.initiative === s.pilot.initiative &&
              stat.listpoints == squadron.cost
          );

          return (
            <div
              key={s.uid}
              className="bg-white rounded-lg shadow px-2 py-6 md:px-3 md:py-4 relative"
            >
              <div className="divide-y divide-gray-200 md:mr-5">
                <PilotPopover
                  halfWidth
                  value={s.pilot}
                  faction={faction}
                  format={format}
                  usedXws={usedXws}
                  ship={s}
                  onChange={(p) => {
                    dispatch(
                      changePilotAction(
                        squadron.uid,
                        s.uid,
                        p?.xws || '',
                        Boolean(s.pilot.slots.find((s) => s === 'Force Power')),
                        Boolean(s.pilot.slots.find((s) => s === 'Talent'))
                      )
                    );
                  }}
                />

                <div className="mt-1"></div>
              </div>

              <div
                className={`mt-1 grid grid-cols-2 gap-1 lg:grid-cols-${
                  !rowLayout ? '2' : '4'
                } md:mr-5 ${bidInfo ? 'mb-3' : 'mb-0'}`}
              >
                {upgrades.map((upgrade, index) => (
                  <div key={uuid()}>
                    <UpgradePopover
                      side={0}
                      slot={upgrade.slot}
                      value={upgrade.upgrade}
                      format={format}
                      options={upgradesForSlot(
                        squadron,
                        s,
                        upgrade.slot,
                        collection,
                        { t, c },
                        true
                      )}
                      onChange={(newValue) => {
                        const getSlotIndex = () => {
                          let slotIndex = 0;
                          for (let i = 0; i < s.pilot.slots.length; i++) {
                            if (s.pilot.slots[i] === upgrade.slot) {
                              if (i === index) {
                                return slotIndex;
                              }
                              slotIndex += 1;
                            }
                          }
                          return 0;
                        };
                        dispatch(
                          setUpgrade(
                            squadron.uid,
                            s.uid,
                            upgrade.slot,
                            getSlotIndex(),
                            newValue
                          )
                        );
                      }}
                    />
                  </div>
                ))}
                {showHardpointPicker && (
                  <UpgradePopover
                    side={0}
                    slot={'Hardpoint'}
                    format={format}
                    options={hardpointOptions()}
                    onChange={(newValue) => {
                      const slot = newValue?.sides[0].slots[0] || 'Hardpoint';
                      let slotIndex = 0;
                      for (let i = 0; i < s.pilot.slots.length; i++) {
                        if (s.pilot.slots[i] === slot) {
                          if (i === 0) {
                            return slotIndex;
                          }
                          slotIndex += 1;
                        }
                      }

                      dispatch(
                        setUpgrade(
                          squadron.uid,
                          s.uid,
                          slot,
                          slotIndex,
                          newValue
                        )
                      );
                    }}
                  />
                )}
              </div>

              {bidInfo && (
                <div className="absolute bottom-2 left-3 right-8 text-xs font-normal pt-1 text-gray-500">
                  {`Bid gives a ${bidInfo.movelast}% chance of moving last and is meaningful in ${bidInfo.meaningful}% of games`}
                </div>
              )}

              <button
                className="pointer absolute top-2 right-2 text-red-400 hover:text-red-500"
                onClick={() => dispatch(removeShip(squadron.uid, s.uid))}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              <button
                className="pointer absolute bottom-2 right-2 text-gray-400 hover:text-gray-500"
                onClick={() => dispatch(copyShip(squadron.uid, s.uid))}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mx-3 sm:mx-0 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1">
        <div className="shadow rounded-md">
          <ShipPopover
            value={shipBase}
            options={shipTypeOptions(squadron, t, collection, true)}
            onChange={setShipBase}
          />
        </div>

        {shipBase && (
          <div className="shadow rounded-md">
            <PilotPopover
              ship={shipBase}
              faction={faction}
              format={format}
              usedXws={usedXws}
              onChange={(v) => {
                if (v) {
                  dispatch(addShipAction(squadron.uid, shipBase.xws, v.xws));
                }
                setShipBase(undefined);
              }}
            />
          </div>
        )}
      </div>

      <div className="text-xs font-normal mt-5 text-gray-500 text-center">
        Statistics powered by{' '}
        <a href="https://www.pinksquadron.dk/pbm/" className="text-pink-400">
          Pink Brain Matter
        </a>
      </div>

      <Notification
        title={notificationTitle}
        message={notificationMessage}
        onClear={() => {
          setNotificationTitle(undefined);
          setNotificationMessage(undefined);
        }}
      />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      let { lbx, uid } = query;

      const appStore: Store<AppState, AnyAction> = store;
      const { getState, dispatch } = appStore;

      if (req) {
        const session = await getSession({ req });
        if (session?.user) {
          // @ts-ignore
          const user: UserState = session.user;
          if (user && user.jwt) {
            dispatch(userDidLogin(user));
            const { data } = await requests.syncRequest(user);
            // console.log(JSON.stringify(data));
            data.tournaments = [];
            dispatch(importAllSync(data));
          }
        }
      }

      // Först kolla om vi har en exakt likadan lista redan
      const identicalSquad = getState().app.xws.find(
        (x) => decodeURIComponent(serialize(x)) === (lbx as string)
      );
      let foundOnServer: boolean;
      if (identicalSquad) {
        uid = identicalSquad.uid;
        foundOnServer = true;
      } else if (!getState().app.xws.find((x) => x && x.uid === uid)) {
        // Om vi inte har den sparad så är det dax att skapa, vi sätter nytt uid då
        if (lbx) {
          // Importera utifrån
          const xws = deserialize(lbx as string, uuid());
          uid = xws.uid;
          dispatch(importSquadron(xws));
        } else {
          // Skapa helt ny
          uid = dispatch(addSquadron('Rebel Alliance', 'Extended', uuid())).uid;
        }
        foundOnServer = false;
      } else {
        foundOnServer = true;
      }

      // @ts-ignore
      const cookies = parseCookies({ req: req as NextApiRequest, res });

      const stats = await fetch(
        'https://www.pinksquadron.dk/pbm/api/initiativegrid.php'
      )
        .then((r) => r.json())
        .then((r: any[]) =>
          r.map(
            (s) =>
              ({
                format: s.format === 'hs' ? 'Hyperspace' : 'Extended',
                listpoints: parseInt(s.listpoints),
                initiative: parseInt(s.initiative),
                meaningful: new Number(s.meaningfulpercentage).valueOf(),
                movelast: new Number(s.movelastpercentage).valueOf(),
              } as BidStatistics)
          )
        );

      return {
        props: {
          uid,
          cookies,
          stats,
          foundOnServer,
        },
      };
    }
);

export default EditPage;

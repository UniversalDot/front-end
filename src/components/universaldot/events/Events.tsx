import { useEffect, useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';

// Events to be filtered from feed
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":0})',
  'system:ExtrinsicSuccess:: (phase={"ApplyExtrinsic":1})',
];

const eventName = (ev: any) => `${ev.section}:${ev.method}`;
const eventParams = (ev: any) => JSON.stringify(ev.data);

const Events = () => {
  const { api } = useSubstrate();
  const [eventFeed, setEventFeed] = useState<any>([]);

  useEffect(() => {
    let unsub: any = null;
    let keyNum = 0;

    if (api?.query?.system) {
      const allEvents = async () => {
        unsub = await api.query.system.events((events: any[]) => {
          // loop through the Vec<EventRecord>
          events.forEach((record) => {
            // extract the phase, event and the event types
            const { event, phase } = record;

            // show what we are busy with
            const evHuman = event.toHuman();
            const evName = eventName(evHuman);
            const evParams = eventParams(evHuman);
            const evNamePhase = `${evName}::(phase=${phase.toString()})`;

            if (FILTERED_EVENTS.includes(evNamePhase)) return;

            setEventFeed((e: any) => [
              {
                key: keyNum,
                icon: 'bell',
                summary: evName,
                content: evParams,
              },
              ...e,
            ]);

            keyNum += 1;
          });
        });
      };

      allEvents();
    }

    return () => unsub && unsub();
  }, [api?.query?.system]);

  // eslint-disable-next-line multiline-ternary
  return api?.query?.system?.events ? (
    <div>
      <button onClick={(_) => setEventFeed([])} />
      <div>
        {eventFeed.map((event: any, index: number) => (
          <div key={`e${index}`}>event here</div>
        ))}
      </div>
    </div>
  ) : (
    <div>There are no events...</div>
  );
};

Events.displayName = 'Events';

export { Events };

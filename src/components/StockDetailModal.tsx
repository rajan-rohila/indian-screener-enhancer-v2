import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { StockKey, STOCKS } from "../constants/industry/stocks";
import { AnalystKey, ANALYSTS } from "../constants/people/analysts";
import { loadStockJournal } from "../data/stockJournals";
import type { StockJournal, ThesisEntry, TimelineEntry } from "../types/stockJournal";
import { Outlook, Action } from "../types/stockJournal";
import harnoorImg from "../assets/people/analysts/harnoor.png";
import kediaImg from "../assets/people/analysts/kedia.png";

const ANALYST_IMAGES: Record<AnalystKey, string> = {
  [AnalystKey.HARNOOR]: harnoorImg,
  [AnalystKey.KEDIA]: kediaImg,
};

const ACTION_COLORS: Record<Action, string> = {
  [Action.BUY]: "#2ea043",
  [Action.HOLD]: "#d29922",
  [Action.SELL]: "#cf222e",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function AnalystAvatar({ analyst, size = 28 }: { analyst: AnalystKey; size?: number }) {
  return (
    <img
      src={ANALYST_IMAGES[analyst]}
      alt={ANALYSTS[analyst].name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

function ThesisSection({ entries }: { entries: ThesisEntry[] }) {
  return (
    <SpaceBetween size="m">
      {entries.map((entry, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <AnalystAvatar analyst={entry.analyst} size={32} />
          <div style={{ flex: 1 }}>
            <Box fontSize="body-s" color="text-body-secondary">
              {ANALYSTS[entry.analyst].name} · {formatDate(entry.date)}
            </Box>
            <ul style={{ margin: "4px 0 0 0", paddingLeft: 18 }}>
              {entry.arguments.map((arg, j) => (
                <li key={j} style={{ marginBottom: 2 }}>
                  <Box fontSize="body-s">{arg}</Box>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </SpaceBetween>
  );
}

function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  // Group by date
  const grouped = entries.reduce<Record<string, TimelineEntry[]>>((acc, entry) => {
    (acc[entry.date] ??= []).push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {sortedDates.map((date, dateIdx) => (
        <div key={date}>
          {/* Date divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              margin: dateIdx === 0 ? "0 0 12px 0" : "16px 0 12px 0",
            }}
          >
            <div style={{ height: 1, flex: 1, background: "var(--color-border-divider-default, #e9ebed)" }} />
            <Box fontSize="body-s" color="text-body-secondary" fontWeight="bold">
              {formatDate(date)}
            </Box>
            <div style={{ height: 1, flex: 1, background: "var(--color-border-divider-default, #e9ebed)" }} />
          </div>

          <SpaceBetween size="s">
            {grouped[date].map((entry, entryIdx) => (
              <div key={entryIdx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <AnalystAvatar analyst={entry.analyst} size={28} />
                <div style={{ flex: 1 }}>
                  {/* Update points */}
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {entry.update.map((point, j) => (
                      <li key={j} style={{ marginBottom: 2 }}>
                        <Box fontSize="body-s">{point}</Box>
                      </li>
                    ))}
                  </ul>
                  {/* Outlook + Action badges */}
                  {(entry.outlook || entry.action) && (
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      {entry.outlook && (
                        <span
                          style={{
                            background: entry.outlook === Outlook.BULLISH ? "#2ea043" : entry.outlook === Outlook.BEARISH ? "#cf222e" : "#d29922",
                            color: "#fff",
                            borderRadius: 4,
                            padding: "2px 8px",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {entry.outlook}
                        </span>
                      )}
                      {entry.action && (
                        <span
                          style={{
                            background: ACTION_COLORS[entry.action],
                            color: "#fff",
                            borderRadius: 4,
                            padding: "2px 8px",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {entry.action}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </SpaceBetween>
        </div>
      ))}
    </div>
  );
}

interface StockDetailModalProps {
  stockKey: StockKey | null;
  onDismiss: () => void;
}

export default function StockDetailModal({ stockKey, onDismiss }: StockDetailModalProps) {
  const [journal, setJournal] = useState<StockJournal | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stockKey) {
      setJournal(null);
      return;
    }
    setLoading(true);
    loadStockJournal(stockKey).then((data) => {
      setJournal(data);
      setLoading(false);
    });
  }, [stockKey]);

  if (!stockKey) return null;

  const stock = STOCKS[stockKey];

  return (
    <Modal
      visible={true}
      onDismiss={onDismiss}
      header={stock.name}
      size="large"
    >
      {loading ? (
        <Box textAlign="center" padding="l">
          <Spinner size="large" />
        </Box>
      ) : !journal ? (
        <Box textAlign="center" color="text-body-secondary" padding="l">
          No journal data available for this stock yet.
        </Box>
      ) : (
        <SpaceBetween size="l">
          {/* Thesis section */}
          {journal.thesis.length > 0 && (
            <div>
              <Box variant="h3" margin={{ bottom: "xs" }}>Thesis</Box>
              <ThesisSection entries={journal.thesis} />
            </div>
          )}

          {/* Timeline section */}
          {journal.timeline.length > 0 && (
            <div>
              <Box variant="h3" margin={{ bottom: "xs" }}>Timeline</Box>
              <div style={{ maxHeight: 400, overflowY: "auto", paddingRight: 4 }}>
                <TimelineSection entries={journal.timeline} />
              </div>
            </div>
          )}
        </SpaceBetween>
      )}
    </Modal>
  );
}

import { useState, useMemo } from "react";
import {
  Container,
  Box,
  Icon,
  Table,
  SpaceBetween,
  SideNavigation,
  Button,
  Link,
  Toggle,
  ExpandableSection,
} from "@cloudscape-design/components";
import type { SideNavigationProps, TableProps } from "@cloudscape-design/components";
import { AnalystKey, ANALYSTS } from "../../constants/people/analysts";
import { IndustryGroupKey, INDUSTRY_GROUPS } from "../../constants/industry/industryGroups";
import { SUB_INDUSTRIES, SubIndustryKey } from "../../constants/industry/subIndustries";
import { STOCKS, StockKey } from "../../constants/industry/stocks";
import { INDUSTRY_TREE } from "../../constants/industry/industryTree";
import { buildTree, type Vote } from "../../data/recommendations/recommendationTree";
import { useStockData } from "../../hooks/useStockData";
import { useIndustryUrls } from "../../hooks/useIndustryUrls";
import harnoorImg from "../../assets/people/analysts/harnoor.png";
import kediaImg from "../../assets/people/analysts/kedia.png";

const ANALYST_IMAGES: Record<AnalystKey, string> = {
  [AnalystKey.HARNOOR]: harnoorImg,
  [AnalystKey.KEDIA]: kediaImg,
};

function ThesisCell({ votes, filterAnalyst }: { votes: Vote[]; filterAnalyst?: AnalystKey }) {
  const displayVotes = filterAnalyst ? votes.filter((v) => v.analyst === filterAnalyst) : votes;
  return (
    <SpaceBetween size="xxs">
      {displayVotes.map((v, i) => (
        <Box key={i} fontSize="body-s" color="text-body-secondary">
          <img
            src={ANALYST_IMAGES[v.analyst]}
            alt={ANALYSTS[v.analyst].name}
            style={{ width: 16, height: 16, borderRadius: "50%", objectFit: "cover", marginRight: 6, verticalAlign: "middle" }}
          />
          {v.thesis}
        </Box>
      ))}
    </SpaceBetween>
  );
}

// Consolidated view types
interface ConsolidatedRow {
  id: string;
  level: "industryGroup" | "subIndustry" | "stock";
  name: string;
  votes: Vote[];
  parentId: string | null;
  url?: string;
  stockKey?: StockKey;
}

export default function Recommendations() {
  const [selectedAnalysts, setSelectedAnalysts] = useState<AnalystKey[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IndustryGroupKey | null>(null);
  const [consolidated, setConsolidated] = useState(false);
  const [stocksOnly, setStocksOnly] = useState(true);
  const [igExpanded, setIgExpanded] = useState(false);
  const [siExpanded, setSiExpanded] = useState(false);
  const [stExpanded, setStExpanded] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Always build full tree for aggregate vote counts
  const fullTree = useMemo(() => buildTree(), []);

  // Get all stock keys from the tree for background fetching
  const allStockKeys = useMemo(
    () => fullTree.stocks.map((st) => st.key as StockKey),
    [fullTree]
  );
  const stockData = useStockData(allStockKeys);
  const industryUrls = useIndustryUrls();

  // Filter rows to only those where selected analyst has a vote, but keep all votes
  const tree = useMemo(() => {
    if (selectedAnalysts.length === 0) return fullTree;
    const analyst = selectedAnalysts[0];
    return {
      industryGroups: fullTree.industryGroups.filter((ig) => ig.votes.some((v) => v.analyst === analyst)),
      subIndustries: fullTree.subIndustries.filter((si) => si.votes.some((v) => v.analyst === analyst)),
      stocks: fullTree.stocks.filter((st) => st.votes.some((v) => v.analyst === analyst)),
    };
  }, [fullTree, selectedAnalysts]);

  // Compute which analysts and groups have stock recommendations
  const analystsWithStocks = useMemo(() => {
    const set = new Set<AnalystKey>();
    for (const st of fullTree.stocks) {
      for (const v of st.votes) set.add(v.analyst);
    }
    return set;
  }, [fullTree]);

  const groupsWithStocks = useMemo(() => {
    const set = new Set<IndustryGroupKey>();
    for (const st of fullTree.stocks) {
      set.add(STOCKS[st.key].industryGroup);
    }
    return set;
  }, [fullTree]);

  // Build side nav items from the tree's industry groups
  const navItems: SideNavigationProps.Item[] = useMemo(() => {
    const groups = stocksOnly
      ? tree.industryGroups.filter((ig) => groupsWithStocks.has(ig.key))
      : tree.industryGroups;
    const links: SideNavigationProps.Item[] = groups.map((ig) => ({
      type: "link" as const,
      text: INDUSTRY_GROUPS[ig.key].name,
      href: `#${ig.key}`,
    }));
    return [
      { type: "divider" as const },
      ...links,
    ];
  }, [tree, stocksOnly, groupsWithStocks]);

  const toggleAnalyst = (key: AnalystKey) => {
    setSelectedAnalysts((prev) =>
      prev.length === 1 && prev[0] === key ? [] : [key]
    );
    setSelectedGroup(null);
  };

  // Filter tree by selected industry group
  const filteredTree = useMemo(() => {
    let result = tree;

    // Stocks only: keep only items tied to stock recommendations
    if (stocksOnly) {
      const stockSubIndustries = new Set(result.stocks.map((st) => STOCKS[st.key].subIndustry));
      const stockGroups = new Set(result.stocks.map((st) => STOCKS[st.key].industryGroup));
      result = {
        industryGroups: result.industryGroups.filter((ig) => stockGroups.has(ig.key)),
        subIndustries: result.subIndustries.filter((si) => stockSubIndustries.has(si.key)),
        stocks: result.stocks,
      };
    }

    if (!selectedGroup) return result;
    return {
      industryGroups: result.industryGroups.filter((ig) => ig.key === selectedGroup),
      subIndustries: result.subIndustries.filter((si) => {
        const groupIndustries = INDUSTRY_TREE[selectedGroup] ?? {};
        const allSubKeys = Object.values(groupIndustries).flat() as SubIndustryKey[];
        return allSubKeys.includes(si.key);
      }),
      stocks: result.stocks.filter((st) => {
        return STOCKS[st.key].industryGroup === selectedGroup;
      }),
    };
  }, [tree, selectedGroup, stocksOnly]);

  // Sort stocks: most votes first, then lowest PE
  const sortedFilteredTree = useMemo(() => {
    const getPe = (key: string) => {
      const sd = stockData.get(key as StockKey);
      return sd?.pe ? parseFloat(sd.pe) : Infinity;
    };

    const sortByVotesThenPe = <T extends { votes: Vote[]; key: string }>(items: T[]) =>
      [...items].sort((a, b) => {
        const voteDiff = b.votes.length - a.votes.length;
        if (voteDiff !== 0) return voteDiff;
        return getPe(a.key) - getPe(b.key);
      });

    return {
      industryGroups: [...filteredTree.industryGroups].sort((a, b) => b.votes.length - a.votes.length),
      subIndustries: [...filteredTree.subIndustries].sort((a, b) => b.votes.length - a.votes.length),
      stocks: sortByVotesThenPe(filteredTree.stocks),
    };
  }, [filteredTree, stockData]);

  // Build consolidated rows
  const consolidatedRows = useMemo((): ConsolidatedRow[] => {
    const rows: ConsolidatedRow[] = [];

    for (const ig of sortedFilteredTree.industryGroups) {
      const igId = `ig-${ig.key}`;
      rows.push({
        id: igId,
        level: "industryGroup",
        name: INDUSTRY_GROUPS[ig.key].name,
        votes: ig.votes,
        parentId: null,
      });

      // Sub-industries under this group
      const groupIndustries = INDUSTRY_TREE[ig.key] ?? {};
      const allSubKeys = Object.values(groupIndustries).flat() as SubIndustryKey[];
      const matchingSubs = sortedFilteredTree.subIndustries.filter((si) => allSubKeys.includes(si.key));

      for (const si of matchingSubs) {
        const siId = `si-${si.key}`;
        rows.push({
          id: siId,
          level: "subIndustry",
          name: SUB_INDUSTRIES[si.key].name,
          votes: si.votes,
          parentId: igId,
          url: undefined,
        });

        // Stocks under this sub-industry
        const matchingStocks = sortedFilteredTree.stocks.filter((st) => STOCKS[st.key].subIndustry === si.key);
        for (const st of matchingStocks) {
          rows.push({
            id: `st-${st.key}`,
            level: "stock",
            name: STOCKS[st.key].name,
            votes: st.votes,
            parentId: siId,
            url: STOCKS[st.key].screenerUrl,
            stockKey: st.key as StockKey,
          });
        }
      }
    }

    return rows;
  }, [sortedFilteredTree, industryUrls]);

  const topLevelRows = useMemo(
    () => consolidatedRows.filter((r) => r.parentId === null),
    [consolidatedRows]
  );

  const expandedItems = useMemo(
    () => {
      const rowMap = new Map(consolidatedRows.map((r) => [r.id, r]));
      return [...expandedIds].map((id) => rowMap.get(id)).filter(Boolean) as ConsolidatedRow[];
    },
    [consolidatedRows, expandedIds]
  );

  // Stable children lookup
  const childrenMap = useMemo(() => {
    const map = new Map<string, ConsolidatedRow[]>();
    for (const row of consolidatedRows) {
      if (row.parentId) {
        const children = map.get(row.parentId) ?? [];
        children.push(row);
        map.set(row.parentId, children);
      }
    }
    return map;
  }, [consolidatedRows]);

  const filterAnalyst = selectedAnalysts.length === 1 ? selectedAnalysts[0] : undefined;

  const NAME_WIDTH = 300;
  const PE_WIDTH = 80;
  const VOTES_WIDTH = 80;

  const igColumns: TableProps.ColumnDefinition<typeof sortedFilteredTree.industryGroups[0]>[] = [
    { id: "name", header: "Name", cell: (item) => INDUSTRY_GROUPS[item.key].name, width: NAME_WIDTH, minWidth: NAME_WIDTH },
    { id: "pe", header: "P/E", cell: () => null, width: PE_WIDTH, minWidth: PE_WIDTH },
    { id: "votes", header: "Votes", cell: (item) => item.votes.length, width: VOTES_WIDTH, minWidth: VOTES_WIDTH },
    { id: "thesis", header: "Thesis", cell: (item) => <ThesisCell votes={item.votes} filterAnalyst={filterAnalyst} /> },
  ];

  const siColumns: TableProps.ColumnDefinition<typeof sortedFilteredTree.subIndustries[0]>[] = [
    { id: "name", header: "Name", cell: (item) => {
      const name = SUB_INDUSTRIES[item.key].name;
      const url = industryUrls.get(name);
      return url ? <Link href={url} external>{name}</Link> : <>{name}</>;
    }, width: NAME_WIDTH, minWidth: NAME_WIDTH },
    { id: "pe", header: "P/E", cell: () => null, width: PE_WIDTH, minWidth: PE_WIDTH },
    { id: "votes", header: "Votes", cell: (item) => item.votes.length, width: VOTES_WIDTH, minWidth: VOTES_WIDTH },
    { id: "thesis", header: "Thesis", cell: (item) => <ThesisCell votes={item.votes} filterAnalyst={filterAnalyst} /> },
  ];

  const stColumns: TableProps.ColumnDefinition<typeof sortedFilteredTree.stocks[0]>[] = [
    { id: "name", header: "Name", cell: (item) => {
      const stock = STOCKS[item.key];
      return stock.screenerUrl ? <Link href={stock.screenerUrl} external>{stock.name}</Link> : <>{stock.name}</>;
    }, width: NAME_WIDTH, minWidth: NAME_WIDTH },
    { id: "pe", header: "P/E", cell: (item) => {
      const sd = stockData.get(item.key as StockKey);
      return sd?.pe ? Math.round(parseFloat(sd.pe)).toString() : null;
    }, width: PE_WIDTH, minWidth: PE_WIDTH },
    { id: "votes", header: "Votes", cell: (item) => item.votes.length, width: VOTES_WIDTH, minWidth: VOTES_WIDTH },
    { id: "thesis", header: "Thesis", cell: (item) => <ThesisCell votes={item.votes} filterAnalyst={filterAnalyst} /> },
  ];

  const consolidatedColumns: TableProps.ColumnDefinition<ConsolidatedRow>[] = [
    {
      id: "name",
      header: "Name",
      cell: (item) => {
        const label = <Box fontWeight={item.level === "industryGroup" ? "bold" : "normal"}>{item.name}</Box>;
        if (item.url) {
          return <Link href={item.url} external>{item.name}</Link>;
        }
        return label;
      },
      width: NAME_WIDTH,
      minWidth: NAME_WIDTH,
    },
    {
      id: "pe",
      header: "P/E",
      width: PE_WIDTH,
      minWidth: PE_WIDTH,
      cell: (item) => {
        if (item.level !== "stock" || !item.stockKey) return null;
        const sd = stockData.get(item.stockKey);
        return sd?.pe ? Math.round(parseFloat(sd.pe)).toString() : null;
      },
    },
    {
      id: "votes",
      header: "Votes",
      width: VOTES_WIDTH,
      minWidth: VOTES_WIDTH,
      cell: (item) => {
        const hasChildren = childrenMap.has(item.id);
        const isExpanded = expandedItems.some((r) => r.id === item.id);
        if (hasChildren && isExpanded) return null;
        return item.votes.length;
      },
    },
    {
      id: "thesis",
      header: "Thesis",
      cell: (item) => {
        const hasChildren = childrenMap.has(item.id);
        const isExpanded = expandedItems.some((r) => r.id === item.id);
        if (hasChildren && isExpanded) return null;
        return <ThesisCell votes={item.votes} filterAnalyst={filterAnalyst} />;
      },
    },
  ];

  return (
    <div style={{ display: "flex", height: "100%", marginTop: "16px", gap: "16px", maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ width: 160, flexShrink: 0 }}>
        <Container
          disableContentPaddings
          header={
            <span style={{ visibility: "hidden" }}><Box float="right"><Icon name="status-positive" variant="success" /></Box></span>
          }
        >
          {/* Clear */}
          <div style={{ padding: "4px 12px", textAlign: "center" }}>
            <Button
              iconName="filter"
              disabled={selectedAnalysts.length === 0 && selectedGroup === null && !stocksOnly}
              onClick={() => { setSelectedAnalysts([]); setSelectedGroup(null); setStocksOnly(false); setIgExpanded(true); setSiExpanded(true); setStExpanded(true); }}
            >
              Clear
            </Button>
          </div>

          <div style={{ margin: "-8px 0" }}>
            <SideNavigation items={[{ type: "divider" }]} />
          </div>

          {/* Stocks only filter */}
          <div style={{ padding: "4px 16px" }}>
            <Toggle
              checked={stocksOnly}
              onChange={({ detail }) => {
                setStocksOnly(detail.checked);
                if (detail.checked) {
                  setIgExpanded(false);
                  setSiExpanded(false);
                  setStExpanded(true);
                } else {
                  setIgExpanded(true);
                  setSiExpanded(true);
                }
              }}
            >
              Stocks only
            </Toggle>
          </div>

          <div style={{ margin: "-8px 0" }}>
            <SideNavigation items={[{ type: "divider" }]} />
          </div>

          {/* Analyst photos */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: "4px 8px" }}>
            {(Object.values(AnalystKey) as AnalystKey[])
              .filter((key) => !stocksOnly || analystsWithStocks.has(key))
              .map((key) => (
              <div
                key={key}
                onClick={() => toggleAnalyst(key)}
                style={{
                  cursor: "pointer",
                  opacity: selectedAnalysts.length === 0 || selectedAnalysts.includes(key) ? 1 : 0.6,
                  transition: "opacity 0.2s",
                }}
                title={ANALYSTS[key].name}
              >
                <img
                  src={ANALYST_IMAGES[key]}
                  alt={ANALYSTS[key].name}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: selectedAnalysts.includes(key) ? "3px solid #0972d3" : "3px solid transparent",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Industry group nav */}
          <SideNavigation
            activeHref={selectedGroup ? `#${selectedGroup}` : "#all"}
            onFollow={(e) => {
              e.preventDefault();
              const href = e.detail.href;
              const key = href.replace("#", "") as IndustryGroupKey;
              if (stocksOnly && !groupsWithStocks.has(key)) return;
              setSelectedGroup((prev) => prev === key ? null : key);
            }}
            items={navItems}
          />
        </Container>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Container
          header={
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <Toggle
                checked={consolidated}
                onChange={({ detail }) => { setConsolidated(detail.checked); setExpandedIds(new Set()); }}
              >
                Consolidate
              </Toggle>
              {consolidated && (
                <SpaceBetween direction="horizontal" size="xxs">
                  <Button
                    iconName="treeview-collapse"
                    variant="icon"
                    ariaLabel="Fold one level"
                    onClick={() => {
                      const expandedSubIds = expandedItems.filter((r) => r.level === "subIndustry").map((r) => r.id);
                      if (expandedSubIds.length > 0) {
                        setExpandedIds((prev) => {
                          const next = new Set(prev);
                          for (const id of expandedSubIds) next.delete(id);
                          return next;
                        });
                      } else {
                        setExpandedIds(new Set());
                      }
                    }}
                  />
                  <Button
                    iconName="treeview-expand"
                    variant="icon"
                    ariaLabel="Unfold one level"
                    onClick={() => {
                      const topLevelExpandable = consolidatedRows.filter(
                        (r) => r.level === "industryGroup" && childrenMap.has(r.id)
                      );
                      const topAllExpanded = topLevelExpandable.every((r) => expandedIds.has(r.id));

                      if (!topAllExpanded) {
                        setExpandedIds(new Set(topLevelExpandable.map((r) => r.id)));
                      } else {
                        const allExpandable = consolidatedRows.filter((r) =>
                          childrenMap.has(r.id)
                        );
                        setExpandedIds(new Set(allExpandable.map((r) => r.id)));
                      }
                    }}
                  />
                </SpaceBetween>
              )}
            </div>
          }
        >
          <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
            {consolidated ? (
              <Table
                columnDefinitions={consolidatedColumns}
                items={topLevelRows}
                variant="embedded" wrapLines
                expandableRows={{
                  getItemChildren: (item) => childrenMap.get(item.id) ?? [],
                  isItemExpandable: (item) => childrenMap.has(item.id),
                  expandedItems,
                  onExpandableItemToggle: ({ detail }) => {
                    const item = detail.item;
                    setExpandedIds((prev) => {
                      const next = new Set(prev);
                      if (detail.expanded) {
                        next.add(item.id);
                      } else {
                        next.delete(item.id);
                      }
                      return next;
                    });
                  },
                }}
                trackBy="id"
              />
            ) : (
              <SpaceBetween size="l">
                {sortedFilteredTree.industryGroups.length > 0 && (
                  <ExpandableSection
                    expanded={igExpanded}
                    onChange={({ detail }) => setIgExpanded(detail.expanded)}
                    headerText={`Industry Groups (${sortedFilteredTree.industryGroups.length})`}
                  >
                    <Table
                      columnDefinitions={igColumns}
                      items={sortedFilteredTree.industryGroups}
                      variant="embedded" wrapLines
                    />
                  </ExpandableSection>
                )}
                {sortedFilteredTree.subIndustries.length > 0 && (
                  <ExpandableSection
                    expanded={siExpanded}
                    onChange={({ detail }) => setSiExpanded(detail.expanded)}
                    headerText={`Sub-Industries (${sortedFilteredTree.subIndustries.length})`}
                  >
                    <Table
                      columnDefinitions={siColumns}
                      items={sortedFilteredTree.subIndustries}
                      variant="embedded" wrapLines
                    />
                  </ExpandableSection>
                )}
                {sortedFilteredTree.stocks.length > 0 && (
                  <ExpandableSection
                    expanded={stExpanded}
                    onChange={({ detail }) => setStExpanded(detail.expanded)}
                    headerText={`Stocks (${sortedFilteredTree.stocks.length})`}
                  >
                    <Table
                      columnDefinitions={stColumns}
                      items={sortedFilteredTree.stocks}
                      variant="embedded" wrapLines
                    />
                  </ExpandableSection>
                )}
              </SpaceBetween>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

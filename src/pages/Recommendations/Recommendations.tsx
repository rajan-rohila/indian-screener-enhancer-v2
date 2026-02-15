import { useState, useMemo } from "react";
import {
  Container,
  Box,
  Icon,
  Table,
  Header,
  SpaceBetween,
  SideNavigation,
  Button,
  Link,
  Toggle,
} from "@cloudscape-design/components";
import type { SideNavigationProps, TableProps } from "@cloudscape-design/components";
import { AnalystKey, ANALYSTS } from "../../constants/people/analysts";
import { IndustryGroupKey, INDUSTRY_GROUPS } from "../../constants/industry/industryGroups";
import { SUB_INDUSTRIES, SubIndustryKey } from "../../constants/industry/subIndustries";
import { STOCKS } from "../../constants/industry/stocks";
import { INDUSTRY_TREE } from "../../constants/industry/industryTree";
import { buildTree, type Vote } from "../../data/recommendations/recommendationTree";
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
}

export default function Recommendations() {
  const [selectedAnalysts, setSelectedAnalysts] = useState<AnalystKey[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IndustryGroupKey | null>(null);
  const [consolidated, setConsolidated] = useState(true);
  const [stocksOnly, setStocksOnly] = useState(false);
  const [expandedItems, setExpandedItems] = useState<ConsolidatedRow[]>([]);

  // Always build full tree for aggregate vote counts
  const fullTree = useMemo(() => buildTree(), []);

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

  // Build consolidated rows
  const consolidatedRows = useMemo((): ConsolidatedRow[] => {
    const rows: ConsolidatedRow[] = [];

    for (const ig of filteredTree.industryGroups) {
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
      const matchingSubs = filteredTree.subIndustries.filter((si) => allSubKeys.includes(si.key));

      for (const si of matchingSubs) {
        const siId = `si-${si.key}`;
        rows.push({
          id: siId,
          level: "subIndustry",
          name: SUB_INDUSTRIES[si.key].name,
          votes: si.votes,
          parentId: igId,
        });

        // Stocks under this sub-industry
        const matchingStocks = filteredTree.stocks.filter((st) => STOCKS[st.key].subIndustry === si.key);
        for (const st of matchingStocks) {
          rows.push({
            id: `st-${st.key}`,
            level: "stock",
            name: STOCKS[st.key].name,
            votes: st.votes,
            parentId: siId,
            url: STOCKS[st.key].screenerUrl,
          });
        }
      }
    }

    return rows;
  }, [filteredTree]);

  const topLevelRows = useMemo(
    () => consolidatedRows.filter((r) => r.parentId === null),
    [consolidatedRows]
  );

  const showIndustryGroupTable = !selectedGroup;
  const filterAnalyst = selectedAnalysts.length === 1 ? selectedAnalysts[0] : undefined;

  const NAME_WIDTH = 300;
  const VOTES_WIDTH = 60;

  const igColumns: TableProps.ColumnDefinition<typeof filteredTree.industryGroups[0]>[] = [
    { id: "name", header: "Industry Group", cell: (item) => INDUSTRY_GROUPS[item.key].name, width: NAME_WIDTH, minWidth: NAME_WIDTH },
    { id: "votes", header: "Votes", cell: (item) => item.votes.length, width: VOTES_WIDTH, minWidth: VOTES_WIDTH },
    { id: "thesis", header: "Thesis", cell: (item) => <ThesisCell votes={item.votes} filterAnalyst={filterAnalyst} /> },
  ];

  const siColumns: TableProps.ColumnDefinition<typeof filteredTree.subIndustries[0]>[] = [
    { id: "name", header: "Sub-Industry", cell: (item) => SUB_INDUSTRIES[item.key].name, width: NAME_WIDTH, minWidth: NAME_WIDTH },
    { id: "votes", header: "Votes", cell: (item) => item.votes.length, width: VOTES_WIDTH, minWidth: VOTES_WIDTH },
    { id: "thesis", header: "Thesis", cell: (item) => <ThesisCell votes={item.votes} filterAnalyst={filterAnalyst} /> },
  ];

  const stColumns: TableProps.ColumnDefinition<typeof filteredTree.stocks[0]>[] = [
    { id: "name", header: "Stock", cell: (item) => STOCKS[item.key].screenerUrl ? <Link href={STOCKS[item.key].screenerUrl} external>{STOCKS[item.key].name}</Link> : STOCKS[item.key].name, width: NAME_WIDTH, minWidth: NAME_WIDTH },
    { id: "votes", header: "Votes", cell: (item) => item.votes.length, width: VOTES_WIDTH, minWidth: VOTES_WIDTH },
    { id: "thesis", header: "Thesis", cell: (item) => <ThesisCell votes={item.votes} filterAnalyst={filterAnalyst} /> },
  ];

  const consolidatedColumns: TableProps.ColumnDefinition<ConsolidatedRow>[] = [
    {
      id: "name",
      header: "Name",
      cell: (item) => {
        const label = <Box fontWeight={item.level === "industryGroup" ? "bold" : "normal"}>{item.name}</Box>;
        return item.url ? <Link href={item.url} external>{item.name}</Link> : label;
      },
      width: NAME_WIDTH,
      minWidth: NAME_WIDTH,
    },
    {
      id: "votes",
      header: "Votes",
      width: VOTES_WIDTH,
      minWidth: VOTES_WIDTH,
      cell: (item) => {
        const hasChildren = consolidatedRows.some((r) => r.parentId === item.id);
        const isExpanded = expandedItems.some((r) => r.id === item.id);
        if (hasChildren && isExpanded) return null;
        return item.votes.length;
      },
    },
    {
      id: "thesis",
      header: "Thesis",
      cell: (item) => {
        const hasChildren = consolidatedRows.some((r) => r.parentId === item.id);
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
              onClick={() => { setSelectedAnalysts([]); setSelectedGroup(null); setStocksOnly(false); }}
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
              onChange={({ detail }) => setStocksOnly(detail.checked)}
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
                  opacity: selectedAnalysts.length === 0 || selectedAnalysts.includes(key) ? 1 : 0.3,
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
                onChange={({ detail }) => { setConsolidated(detail.checked); setExpandedItems([]); }}
              >
                Consolidate
              </Toggle>
              {consolidated && (
                <SpaceBetween direction="horizontal" size="xxs">
                  <Button
                    iconName="treeview-collapse"
                    onClick={() => setExpandedItems([])}
                  >
                    Fold
                  </Button>
                  <Button
                    iconName="treeview-expand"
                    onClick={() => {
                      const allExpandable = consolidatedRows.filter((r) =>
                        consolidatedRows.some((c) => c.parentId === r.id)
                      );
                      setExpandedItems(allExpandable);
                    }}
                  >
                    Unfold
                  </Button>
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
                  getItemChildren: (item) => consolidatedRows.filter((r) => r.parentId === item.id),
                  isItemExpandable: (item) => consolidatedRows.some((r) => r.parentId === item.id),
                  expandedItems,
                  onExpandableItemToggle: ({ detail }) => {
                    const item = detail.item;
                    setExpandedItems((prev) =>
                      detail.expanded
                        ? [...prev, item]
                        : prev.filter((r) => r.id !== item.id)
                    );
                  },
                }}
                trackBy="id"
              />
            ) : (
              <SpaceBetween size="l">
                {showIndustryGroupTable && filteredTree.industryGroups.length > 0 && (
                  <Table
                    columnDefinitions={igColumns}
                    items={filteredTree.industryGroups}
                    header={<Header variant="h3" counter={`(${filteredTree.industryGroups.length})`}>Industry Groups</Header>}
                    variant="embedded" wrapLines
                  />
                )}
                {filteredTree.subIndustries.length > 0 && (
                  <Table
                    columnDefinitions={siColumns}
                    items={filteredTree.subIndustries}
                    header={<Header variant="h3" counter={`(${filteredTree.subIndustries.length})`}>Sub-Industries</Header>}
                    variant="embedded" wrapLines
                  />
                )}
                {filteredTree.stocks.length > 0 && (
                  <Table
                    columnDefinitions={stColumns}
                    items={filteredTree.stocks}
                    header={<Header variant="h3" counter={`(${filteredTree.stocks.length})`}>Stocks</Header>}
                    variant="embedded" wrapLines
                  />
                )}
              </SpaceBetween>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  SideNavigation,
  Header,
  Container,
  Tabs,
  Table,
  Box,
  SpaceBetween,
  StatusIndicator,
  Link,
  Icon,
} from "@cloudscape-design/components";
import type { SideNavigationProps, TableProps } from "@cloudscape-design/components";
import { INDUSTRY_GROUPS, type IndustryGroupKey } from "../../constants/industryGroups";
import { INDUSTRIES, type IndustryKey } from "../../constants/industries";
import { SUB_INDUSTRIES } from "../../constants/subIndustries";
import { INDUSTRY_TREE } from "../../constants/industryTree";
import { useScreenerData } from "../../hooks/useScreenerData";
import type { IndustryData } from "../../types/screener";
import { SIDEBAR_SECTIONS } from "./sidebarSections";
import "./Screener.css";

const navItems: SideNavigationProps.Item[] = SIDEBAR_SECTIONS.flatMap((section, i) => {
  const links: SideNavigationProps.Item[] = section.map((key) => ({
    type: "link" as const,
    text: INDUSTRY_GROUPS[key],
    href: `#${key}`,
  }));
  if (i < SIDEBAR_SECTIONS.length - 1) {
    links.push({ type: "divider" as const });
  }
  return links;
});

function parseNum(val: string): number | null {
  if (!val || val === "-" || val === "%") return null;
  const clean = val.replace(/,/g, "").replace(/%/g, "").trim();
  const num = parseFloat(clean);
  return isNaN(num) ? null : num;
}

const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<IndustryData>[] = [
  {
    id: "name",
    sortingField: "name",
    header: "Industry",
    width: 220,
    minWidth: 220,
    maxWidth: 220,
    cell: (item) => (
      <Link href={item.url} external>
        {item.name}
      </Link>
    ),
    sortingComparator: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: "pe",
    sortingField: "pe",
    header: "P/E",
    cell: (item) => item.pe,
    sortingComparator: (a, b) => (parseNum(a.pe) ?? 0) - (parseNum(b.pe) ?? 0),
  },
  {
    id: "return1y",
    sortingField: "return1y",
    header: "1Y Return",
    cell: (item) => <ValueCell value={item.return1y} />,
    sortingComparator: (a, b) => (parseNum(a.return1y) ?? 0) - (parseNum(b.return1y) ?? 0),
  },
  {
    id: "companies",
    sortingField: "companies",
    header: "Companies",
    width: 80,
    cell: (item) => item.companies,
    sortingComparator: (a, b) => a.companies - b.companies,
  },
  {
    id: "marketCap",
    sortingField: "marketCap",
    header: "Market Cap",
    cell: (item) => item.marketCap,
    sortingComparator: (a, b) => (parseNum(a.marketCap) ?? 0) - (parseNum(b.marketCap) ?? 0),
  },
  {
    id: "salesGrowth",
    sortingField: "salesGrowth",
    header: "Sales Growth",
    cell: (item) => <ValueCell value={item.salesGrowth} />,
    sortingComparator: (a, b) => (parseNum(a.salesGrowth) ?? 0) - (parseNum(b.salesGrowth) ?? 0),
  },
  {
    id: "opm",
    sortingField: "opm",
    header: "OPM",
    cell: (item) => <ValueCell value={item.opm} />,
    sortingComparator: (a, b) => (parseNum(a.opm) ?? 0) - (parseNum(b.opm) ?? 0),
  },
  {
    id: "roce",
    sortingField: "roce",
    header: "ROCE",
    cell: (item) => <ValueCell value={item.roce} />,
    sortingComparator: (a, b) => (parseNum(a.roce) ?? 0) - (parseNum(b.roce) ?? 0),
  },
];

function ValueCell({ value }: { value: string }) {
  if (!value || value === "%" || value === "-") return <Box color="text-status-inactive">-</Box>;
  const num = parseNum(value);
  if (num === null) return <>{value}</>;
  return <Box color={num < 0 ? "text-status-error" : "text-status-success"}>{value}</Box>;
}

function getSubIndustryNames(groupKey: IndustryGroupKey, industryKey?: IndustryKey): string[] {
  const group = INDUSTRY_TREE[groupKey];
  if (industryKey) {
    const subKeys = group[industryKey] ?? [];
    return subKeys.map((k) => SUB_INDUSTRIES[k]);
  }
  return Object.values(group)
    .flat()
    .map((k) => SUB_INDUSTRIES[k]);
}

type FocusPanel = "nav" | "table";

export default function Screener() {
  const [activeHref, setActiveHref] = useState("#FINANCIAL");
  const activeKey = activeHref.replace("#", "") as IndustryGroupKey;
  const { data, loading, error } = useScreenerData();
  const [focusPanel, setFocusPanel] = useState<FocusPanel>("nav");
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const allGroupKeys = useMemo(() => SIDEBAR_SECTIONS.flat(), []);

  const industryKeys = useMemo(
    () => Object.keys(INDUSTRY_TREE[activeKey]) as IndustryKey[],
    [activeKey]
  );

  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [sortingColumn, setSortingColumn] = useState<TableProps.SortingColumn<IndustryData>>({ sortingField: "pe" });
  const [sortingDescending, setSortingDescending] = useState(false);

  // Reset tab and row when group changes
  useMemo(() => {
    setSelectedTab("all");
    setSelectedRowIndex(0);
  }, [activeKey]);

  const filteredData = useMemo(() => {
    const industryKey = selectedTab === "all" ? undefined : (selectedTab as IndustryKey);
    const names = getSubIndustryNames(activeKey, industryKey);
    return data.filter((d) => names.includes(d.name));
  }, [data, activeKey, selectedTab]);

  const sortedData = useMemo(() => {
    const col = COLUMN_DEFINITIONS.find((c) => c.id === sortingColumn.sortingField);
    if (!col?.sortingComparator) return filteredData;
    const sorted = [...filteredData].sort(col.sortingComparator);
    return sortingDescending ? sorted.reverse() : sorted;
  }, [filteredData, sortingColumn, sortingDescending]);

  const sortedIndustryKeys = useMemo(() => {
    return [...industryKeys].sort((a, b) => {
      const countA = data.filter((d) => getSubIndustryNames(activeKey, a).includes(d.name)).length;
      const countB = data.filter((d) => getSubIndustryNames(activeKey, b).includes(d.name)).length;
      return countB - countA;
    });
  }, [industryKeys, data, activeKey]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "1") { e.preventDefault(); setFocusPanel("nav"); return; }
      if (e.key === "2") { e.preventDefault(); setFocusPanel("table"); setSelectedRowIndex(0); return; }

      if (focusPanel === "nav") {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          const idx = allGroupKeys.indexOf(activeKey);
          if (idx === -1) return;
          const next = e.key === "ArrowDown"
            ? (idx + 1) % allGroupKeys.length
            : (idx - 1 + allGroupKeys.length) % allGroupKeys.length;
          setActiveHref(`#${allGroupKeys[next]}`);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setFocusPanel("table");
          setSelectedRowIndex(0);
        }
      } else {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          const allTabs = ["all", ...sortedIndustryKeys];
          const currentIdx = allTabs.indexOf(selectedTab);
          if (currentIdx === -1) return;
          if (e.key === "ArrowLeft" && currentIdx === 0) {
            // At first tab, go back to nav
            setFocusPanel("nav");
          } else {
            const next = e.key === "ArrowRight"
              ? (currentIdx + 1) % allTabs.length
              : (currentIdx - 1 + allTabs.length) % allTabs.length;
            setSelectedTab(allTabs[next]);
            setSelectedRowIndex(0);
          }
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          if (sortedData.length === 0) return;
          setSelectedRowIndex((prev) =>
            e.key === "ArrowDown"
              ? (prev + 1) % sortedData.length
              : (prev - 1 + sortedData.length) % sortedData.length
          );
        } else if (e.key === "Enter" && sortedData[selectedRowIndex]) {
          window.open(sortedData[selectedRowIndex].url, "_blank");
        }
      }
    },
    [focusPanel, activeKey, allGroupKeys, sortedData, selectedRowIndex, sortedIndustryKeys, selectedTab]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const tabItems = [
    {
      id: "all",
      label: `All ${INDUSTRY_GROUPS[activeKey]}`,
      content: null,
    },
    ...sortedIndustryKeys.map((key) => ({
      id: key,
      label: INDUSTRIES[key],
      content: null,
    })),
  ];

  return (
    <div style={{ display: "flex", height: "100%", marginTop: "16px", gap: "16px", maxWidth: "100%", overflow: "hidden" }}>
      <div
        style={{
          width: 160,
          flexShrink: 0,
        }}
        onClick={() => setFocusPanel("nav")}
      >
        <Container
          disableContentPaddings
          header={
            <span style={{ visibility: focusPanel === "nav" ? "visible" : "hidden" }}><Box float="right"><Icon name="status-positive" variant="success" /></Box></span>
          }
        >
          <SideNavigation
            activeHref={activeHref}
            onFollow={(e) => {
              e.preventDefault();
              setActiveHref(e.detail.href);
              setFocusPanel("nav");
            }}
            items={navItems}
          />
        </Container>
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
        onClick={() => setFocusPanel("table")}
      >
        <Container
          header={
            <span style={{ visibility: focusPanel === "table" ? "visible" : "hidden" }}><Box float="right"><Icon name="status-positive" variant="success" /></Box></span>
          }
        >
          <SpaceBetween size="l">
            <Tabs
              activeTabId={selectedTab}
              onChange={({ detail }) => {
                setSelectedTab(detail.activeTabId);
                setSelectedRowIndex(0);
              }}
              tabs={tabItems}
            />
            <div style={{ maxHeight: "calc(100vh - 280px)", overflow: "auto" }}>
              <Table
                columnDefinitions={COLUMN_DEFINITIONS}
                items={sortedData}
                loading={loading}
                loadingText="Loading data from Screener.in..."
                stickyHeader
                selectionType="single"
                selectedItems={
                  sortedData[selectedRowIndex] && focusPanel === "table"
                    ? [sortedData[selectedRowIndex]]
                    : []
                }
                onSelectionChange={({ detail }) => {
                  const item = detail.selectedItems[0];
                  if (item) {
                    const idx = sortedData.indexOf(item);
                    if (idx >= 0) setSelectedRowIndex(idx);
                  }
                  setFocusPanel("table");
                }}
                sortingColumn={sortingColumn}
                sortingDescending={sortingDescending}
                onSortingChange={({ detail }) => {
                  setSortingColumn(detail.sortingColumn);
                  setSortingDescending(detail.isDescending ?? false);
                }}
                header={
                  <Header variant="h2">
                    {String(sortedData.length).padStart(2, "\u00A0")}
                  </Header>
                }
                empty={
                  <Box textAlign="center" color="inherit">
                    {error ? (
                      <StatusIndicator type="error">{error}</StatusIndicator>
                    ) : (
                      <SpaceBetween size="m">
                        <b>No industries found</b>
                        <Box color="text-body-secondary">No matching industries for this filter.</Box>
                      </SpaceBetween>
                    )}
                  </Box>
                }
              />
            </div>
          </SpaceBetween>
        </Container>
      </div>
    </div>
  );
}

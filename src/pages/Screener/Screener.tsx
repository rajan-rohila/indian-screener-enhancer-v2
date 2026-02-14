import { useState, useMemo } from "react";
import { SideNavigation, Header, Container, Tabs } from "@cloudscape-design/components";
import type { SideNavigationProps } from "@cloudscape-design/components";
import { INDUSTRY_GROUPS, type IndustryGroupKey } from "../../constants/industryGroups";
import { INDUSTRIES, type IndustryKey } from "../../constants/industries";
import { INDUSTRY_TREE } from "../../constants/industryTree";
import { SIDEBAR_SECTIONS } from "./sidebarSections";

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

export default function Screener() {
  const [activeHref, setActiveHref] = useState("#FINANCIAL");
  const activeKey = activeHref.replace("#", "") as IndustryGroupKey;

  const industryKeys = useMemo(
    () => Object.keys(INDUSTRY_TREE[activeKey]) as IndustryKey[],
    [activeKey]
  );

  const [selectedIndustry, setSelectedIndustry] = useState<string>(industryKeys[0]);

  // Reset selected industry when group changes
  useMemo(() => {
    setSelectedIndustry(industryKeys[0]);
  }, [industryKeys]);

  const tabItems = industryKeys.map((key) => ({
    id: key,
    label: INDUSTRIES[key],
    content: <p>{INDUSTRIES[key]} content will appear here.</p>,
  }));

  return (
    <div style={{ display: "flex", height: "100%", marginTop: "16px" }}>
      <div style={{ width: 250, flexShrink: 0 }}>
        <Container disableContentPaddings>
          <SideNavigation
            activeHref={activeHref}
            onFollow={(e) => {
              e.preventDefault();
              setActiveHref(e.detail.href);
            }}
            items={navItems}
          />
        </Container>
      </div>
      <div style={{ flex: 1, paddingLeft: "20px", paddingRight: "20px" }}>
        <Container header={<Header variant="h1">{INDUSTRY_GROUPS[activeKey]}</Header>}>
          <Tabs
            activeTabId={selectedIndustry}
            onChange={({ detail }) => setSelectedIndustry(detail.activeTabId)}
            tabs={tabItems}
          />
        </Container>
      </div>
    </div>
  );
}

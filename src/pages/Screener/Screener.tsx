import { useState } from "react";
import { SideNavigation, Header, Container } from "@cloudscape-design/components";
import type { SideNavigationProps } from "@cloudscape-design/components";
import { INDUSTRY_GROUPS, type IndustryGroupKey } from "../../constants/industryGroups";
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
          <p>Screener content for {INDUSTRY_GROUPS[activeKey]} will appear here.</p>
        </Container>
      </div>
    </div>
  );
}

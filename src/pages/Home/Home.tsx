import {
  Container,
  Header,
  SpaceBetween,
  Box,
  Table,
  Button,
} from "@cloudscape-design/components";
import type { TableProps } from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

interface Shortcut {
  key: string;
  action: string;
  page: string;
}

const shortcuts: Shortcut[] = [
  { key: "↑ / ↓", action: "Navigate between industry groups", page: "Screener" },
  { key: "→", action: "Move focus to the table panel", page: "Screener" },
  { key: "← / →", action: "Switch between industry tabs (when in table panel)", page: "Screener" },
  { key: "← (on first tab)", action: "Move focus back to side nav", page: "Screener" },
  { key: "↑ / ↓ (in table panel)", action: "Navigate between table rows", page: "Screener" },
  { key: "Enter (in table panel)", action: "Open selected row on screener.in", page: "Screener" },
  { key: "1", action: "Focus side nav panel", page: "Screener" },
  { key: "2", action: "Focus table panel", page: "Screener" },
];

const shortcutColumns: TableProps.ColumnDefinition<Shortcut>[] = [
  { id: "key", header: "Key", cell: (item) => <Box fontWeight="bold">{item.key}</Box>, width: 200 },
  { id: "action", header: "Action", cell: (item) => item.action },
  { id: "page", header: "Page", cell: (item) => item.page, width: 100 },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <SpaceBetween size="l">
      <Container header={<Header variant="h2">Indian Screener Enhancer</Header>}>
        <SpaceBetween size="s">
          <Box>
            A tool for browsing and analyzing Indian stock market industries using data from screener.in.
          </Box>
          <Box>
            The app has two main sections:
          </Box>
          <Box variant="p">
            <Box fontWeight="bold" display="inline">Screener</Box> — Browse industries organized by industry groups. Each group has tabs for its sub-categories. The table shows live data from screener.in including P/E, 1Y Return, Market Cap, Sales Growth, OPM, and ROCE. All columns are sortable. Use keyboard shortcuts for fast navigation.
          </Box>
          <Box variant="p">
            <Box fontWeight="bold" display="inline">Recommendations</Box> — View analyst recommendations across three levels: industry groups, sub-industries, and specific stocks. Filter by analyst or industry group. Toggle between consolidated (expandable tree) and separate table views.
          </Box>
          <SpaceBetween direction="horizontal" size="s">
            <Button variant="primary" onClick={() => navigate("/screener")}>Go to Screener</Button>
            <Button onClick={() => navigate("/recommendations")}>Go to Recommendations</Button>
          </SpaceBetween>
        </SpaceBetween>
      </Container>

      <Container header={<Header variant="h2">Keyboard Shortcuts</Header>}>
        <Table
          columnDefinitions={shortcutColumns}
          items={shortcuts}
          variant="embedded"
          wrapLines
        />
      </Container>
    </SpaceBetween>
  );
}

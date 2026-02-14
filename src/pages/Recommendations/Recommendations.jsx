import {
  Container,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

export default function Recommendations() {
  return (
    <Container>
      <SpaceBetween size="s">
        <Header variant="h2">Recommendations</Header>
        <p>Your recommendations will appear here.</p>
      </SpaceBetween>
    </Container>
  );
}

import { useState } from "react";
import {
  Button,
  Container,
  FormField,
  Input,
  SpaceBetween,
} from "@cloudscape-design/components";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <Container>
      <SpaceBetween size="s">
        <FormField label="Start editing to see some magic happen">
          <Input
            value={value}
            onChange={(event) => setValue(event.detail.value)}
          />
        </FormField>
        <Button variant="primary">Click me</Button>
      </SpaceBetween>
    </Container>
  );
}

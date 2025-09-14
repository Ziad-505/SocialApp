import { Button, Spinner } from "flowbite-react";
import React from "react";

export default function AppButton({ children, isLoading, ...props }) {
  return (
    <Button {...props} type="submit">
      {isLoading && (
        <Spinner
          size="sm"
          aria-label="Info spinner example"
          className="me-3"
          light
        />
      )}

      {children}
    </Button>
  );
}

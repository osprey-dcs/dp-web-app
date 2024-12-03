import { render, screen } from "@testing-library/react";
import React from "react";
import BrowseRawData from "./BrowseRawData";

describe("BrowseRawData", () => {
    it("renders correctly", () => {
        render(<BrowseRawData />);
        expect(screen.getByTestId("browseRawData")).toBeInTheDocument();
    });
});

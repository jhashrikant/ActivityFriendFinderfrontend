import { render, screen } from "@testing-library/react"
import Navbar from "../Components/Navbar/Navbar"
import { NAV_LINKS } from "../helpers/utils"
import { BrowserRouter } from "react-router-dom"
import { fireEvent } from "@testing-library/react"

describe("Navbar component", () => {

  test('renders logo correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo = screen.getByText(/Activity Friend Finder/i);
    expect(logo).toBeInTheDocument();
  });


  test("render navlinks correctly", () => {
    //render the component
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    NAV_LINKS.forEach(({ label, path }) => {
      const labelvalue = screen.getByText(label)
      expect(labelvalue).toBeInTheDocument()
      expect(labelvalue).toHaveAttribute('href', path)
    });
  })


  test("hamburger correctly opens the navlinks in Mobile mode", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    //get the hambuger
    const hamburgerIcon = screen.getByTestId("hamburgerIcon")
    expect(hamburgerIcon).toBeInTheDocument()
    fireEvent.click(hamburgerIcon)
    const navigation = screen.getByRole("navigation")
    expect(navigation).toHaveClass("active")

    //when clicked again on hamburger menu
    fireEvent.click(hamburgerIcon)
    expect(navigation).not.toHaveClass("active")

  })

})
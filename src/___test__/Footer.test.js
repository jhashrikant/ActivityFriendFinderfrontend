import { render, screen } from "@testing-library/react";
import Footer from "../Components/Footer/Footer";
//test the footer
test("Footer renders successfully",()=>{
  render(<Footer />)
  const privacyPolicy = screen.getByText(/Privacy Policy/i)
  expect(privacyPolicy).toBeInTheDocument()
  const TermsofService  = screen.getByText(/Terms of Service/i)
  expect(TermsofService).toBeInTheDocument()
  const socialMedia = screen.getByText(/Social Media Icons/i)
  expect(socialMedia).toBeInTheDocument()
  expect(<Footer />).not.toBeNull()
})

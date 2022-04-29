const handleMobileMenu = (
  setIsMenuOpen: (callback: (oldMenuState: boolean) => boolean) => void
) => {
  if (window.innerWidth <= 700) {
    setIsMenuOpen((oldMenuState: boolean) => !oldMenuState)
  }
}

export default handleMobileMenu

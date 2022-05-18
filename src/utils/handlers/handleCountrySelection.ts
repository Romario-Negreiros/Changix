import type { Country } from '@app/types/auth'

const handleCountrySelection = (
  event: React.FormEvent<HTMLInputElement>,
  countries: Country[],
  setCountry: (country: Country | undefined) => void,
  setValue: (
    name: any,
    value: string | number | FileList
  ) => void
) => {
  if (event.currentTarget) {
    const { value } = event.currentTarget
    const selectedCountry = countries.find(country =>
      country.name.toLowerCase().includes(value.toLowerCase())
    )
    if (selectedCountry) {
      if (selectedCountry.name !== value) {
        setValue('country', selectedCountry.name)
      }
      setCountry(selectedCountry)
    }
  }
}

export default handleCountrySelection

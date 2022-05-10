import type { VisiblePwds } from '@app/types/global'

const handlePwdVisibility = (
  key: VisiblePwds,
  visiblePwds: VisiblePwds[],
  setVisiblePwds: (
    callback: (oldVisiblePwds: VisiblePwds[]) => VisiblePwds[]
  ) => void
) => {
  if (visiblePwds.includes(key)) {
    setVisiblePwds(oldVisiblePwds =>
      oldVisiblePwds.filter(visiblePwds => visiblePwds !== key)
    )
  } else {
    setVisiblePwds(oldVisiblePwds => [...oldVisiblePwds, key])
  }
}

export default handlePwdVisibility

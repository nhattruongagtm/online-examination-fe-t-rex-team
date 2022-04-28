import React from 'react'
import { useLocation } from 'react-router'

type Props = {}

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export default useQuery

import React from 'react'
import { render } from '@testing-library/react'
import { AppProvider } from '../app/appContext'

export const renderWithAppContext = (ui: React.ReactElement) => {
  return render(<AppProvider>{ui}</AppProvider>)
}


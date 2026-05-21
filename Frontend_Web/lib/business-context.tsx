"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import {
  type BusinessCategory,
  type SaleMode,
  type BusinessCategoryData,
  getBusinessData,
} from "./business-data"

interface BusinessContextValue {
  category: BusinessCategory
  mode: SaleMode
  data: BusinessCategoryData
  setCategory: (cat: BusinessCategory) => void
  setMode: (mode: SaleMode) => void
  toggleMode: () => void
}

const BusinessContext = createContext<BusinessContextValue | null>(null)

const CATEGORY_KEY = "uzapoint_business_category"
const MODE_KEY = "uzapoint_sale_mode"

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [category, setCategoryState] = useState<BusinessCategory>("retail")
  const [mode, setModeState] = useState<SaleMode>("retail")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const storedCat = localStorage.getItem(CATEGORY_KEY) as BusinessCategory | null
    const storedMode = localStorage.getItem(MODE_KEY) as SaleMode | null
    if (storedCat) setCategoryState(storedCat)
    if (storedMode) setModeState(storedMode)
    setLoaded(true)
  }, [])

  const setCategory = useCallback((cat: BusinessCategory) => {
    setCategoryState(cat)
    localStorage.setItem(CATEGORY_KEY, cat)
  }, [])

  const setMode = useCallback((m: SaleMode) => {
    setModeState(m)
    localStorage.setItem(MODE_KEY, m)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === "retail" ? "wholesale" : "retail")
  }, [mode, setMode])

  const data = getBusinessData(category)

  if (!loaded) return null

  return (
    <BusinessContext.Provider value={{ category, mode, data, setCategory, setMode, toggleMode }}>
      {children}
    </BusinessContext.Provider>
  )
}

export function useBusinessContext() {
  const ctx = useContext(BusinessContext)
  if (!ctx) throw new Error("useBusinessContext must be used within BusinessProvider")
  return ctx
}

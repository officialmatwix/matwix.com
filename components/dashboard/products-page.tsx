"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Search, Filter, ShoppingCart, Star, Package, BarChart3 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock products data
  const products = [
    { id: "P1001", name: "Premium Health Supplement", category: "Health", price: 49.99, stock: 125, rating: 4.8 },
    { id: "P1002", name: "Essential Vitamins Pack", category: "Health", price: 29.99, stock: 85, rating: 4.5 },
    { id: "P1003", name: "Organic Skincare Set", category: "Beauty", price: 79.99, stock: 42, rating: 4.9 },
    { id: "P1004", name: "Advanced Weight Management", category: "Fitness", price: 59.99, stock: 68, rating: 4.3 },
    { id: "P1005", name: "Daily Energy Booster", category: "Health", price: 39.99, stock: 110, rating: 4.7 },
    { id: "P1006", name: "Anti-Aging Cream", category: "Beauty", price: 89.99, stock: 37, rating: 4.6 },
    { id: "P1007", name: "Protein Powder Mix", category: "Fitness", price: 54.99, stock: 92, rating: 4.4 },
    { id: "P1008", name: "Immune Support Formula", category: "Health", price: 44.99, stock: 78, rating: 4.8 },
  ]

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.includes(searchTerm)
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Mock sales data
  const salesData = [
    { product: "Premium Health Supplement", units: 1250, revenue: 62475 },
    { product: "Essential Vitamins Pack", units: 980, revenue: 29390 },
    { product: "Organic Skincare Set", units: 645, revenue: 51590 },
    { product: "Advanced Weight Management", units: 820, revenue: 49180 },
    { product: "Daily Energy Booster", units: 1100, revenue: 43989 },
  ]

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="mr-2 h-5 w-5 text-cyan-500" />
            Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Total Products</div>
              <div className="text-2xl font-bold text-cyan-400">24</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Top Seller</div>
              <div className="text-2xl font-bold text-green-400">Health</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Avg. Rating</div>
              <div className="text-2xl font-bold text-amber-400">4.7</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Monthly Sales</div>
              <div className="text-2xl font-bold text-purple-400">{formatCurrency(28750)}</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                className="bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="health">Health</option>
                <option value="beauty">Beauty</option>
                <option value="fitness">Fitness</option>
              </select>

              <Button variant="outline" size="icon" className="border-slate-700 bg-slate-800/50">
                <Filter className="h-4 w-4" />
              </Button>

              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order
              </Button>
            </div>
          </div>

          <Tabs defaultValue="catalog" className="w-full">
            <TabsList className="bg-slate-800/50 p-1 mb-4">
              <TabsTrigger
                value="catalog"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Catalog
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
                Sales
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Inventory
              </TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden"
                  >
                    <div className="h-40 bg-slate-700/50 flex items-center justify-center">
                      <Package className="h-16 w-16 text-slate-500" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-medium text-slate-200">{product.name}</div>
                          <div className="text-xs text-slate-500">{product.id}</div>
                        </div>
                        <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-600"}`}
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 ml-1">{product.rating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-cyan-400">{formatCurrency(product.price)}</div>
                        <div className="text-xs text-slate-400">Stock: {product.stock}</div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 border-slate-700 bg-slate-800/50">
                          Details
                        </Button>
                        <Button size="sm" className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Order
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden mb-6">
                <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2">Units Sold</div>
                  <div className="col-span-2">Revenue</div>
                  <div className="col-span-2">Trend</div>
                </div>

                <div className="divide-y divide-slate-700/30">
                  {salesData.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 py-3 px-3 text-sm hover:bg-slate-800/50">
                      <div className="col-span-6 text-slate-300">{item.product}</div>
                      <div className="col-span-2 text-slate-400">{item.units}</div>
                      <div className="col-span-2 text-cyan-400">{formatCurrency(item.revenue)}</div>
                      <div className="col-span-2">
                        <BarChart3 className={`h-4 w-4 ${index % 2 === 0 ? "text-green-500" : "text-amber-500"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                <div className="text-sm font-medium text-slate-300 mb-3">Sales by Category</div>
                <div className="h-64 flex items-end justify-between px-2">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                      style={{ height: "75%" }}
                    ></div>
                    <div className="text-xs text-slate-500 mt-1">Health</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                      style={{ height: "45%" }}
                    ></div>
                    <div className="text-xs text-slate-500 mt-1">Beauty</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                      style={{ height: "60%" }}
                    ></div>
                    <div className="text-xs text-slate-500 mt-1">Fitness</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-4">Product</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-1">Price</div>
                  <div className="col-span-2">Stock</div>
                  <div className="col-span-2">Status</div>
                </div>

                <div className="divide-y divide-slate-700/30">
                  {products.map((product) => (
                    <div key={product.id} className="grid grid-cols-12 py-3 px-3 text-sm hover:bg-slate-800/50">
                      <div className="col-span-1 text-slate-500">{product.id}</div>
                      <div className="col-span-4 text-slate-300">{product.name}</div>
                      <div className="col-span-2 text-slate-400">{product.category}</div>
                      <div className="col-span-1 text-cyan-400">{formatCurrency(product.price)}</div>
                      <div className="col-span-2 text-slate-400">{product.stock}</div>
                      <div className="col-span-2">
                        <Badge
                          variant="outline"
                          className={`${
                            product.stock > 50
                              ? "bg-green-500/10 text-green-400 border-green-500/30"
                              : product.stock > 20
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-red-500/10 text-red-400 border-red-500/30"
                          } text-xs`}
                        >
                          {product.stock > 50 ? "In Stock" : product.stock > 20 ? "Low Stock" : "Critical"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

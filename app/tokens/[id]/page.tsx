'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi';
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Modal from '@/app/Components/AddLiquidityModal';


const page = () => {
    const [address, setAddress] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
      // Check if window is available (client-side only)
      if (typeof window !== "undefined") {
        const pathSegments = window.location.pathname.split('/')
        const lastSegment = pathSegments[pathSegments.length - 1]
        setAddress(lastSegment)
      }
    }, [])
/*   const address = useAccount();
 */  
return (
    <div className="flex mt-10 w-full flex-col ">
        <Modal address={address} isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className={`sm:col-span-2`} x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>[Token Name]</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {address}
                  </CardDescription>
                </CardHeader>
                <CardFooter className='gap-4'>
                  <Button onClick={()=>setIsOpen(true)}>Create liquidity pool</Button>
                  <Button className='bg-green-700'>Add liquidity</Button>

                </CardFooter>
              </Card>
              <Card className={`${isOpen && 'hidden'}`} x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Current liquidity</CardDescription>
                  <CardTitle className="text-4xl">$2,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    25% of target
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card className={`${isOpen && 'hidden'}`} x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Current Price</CardDescription>
                  <CardTitle className="text-xl">$0.00000029</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    50% of target
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Card x-chunk={` dashboard-05-chunk-3`} className={`${isOpen && 'hidden'}`}>
                <CardHeader className="px-7">
                <CardTitle>Liquidity Holders</CardTitle>
                <CardDescription>
                    All liquidity positions.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Holder</TableHead>
                        <TableHead className="hidden sm:table-cell">
                        Percent
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                        Eth
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow className="bg-accent">
                        <TableCell>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Olivia Smith</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            olivia@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Refund
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-24
                        </TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Noah Williams</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            noah@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Subscription
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-25
                        </TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Emma Brown</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            emma@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-26
                        </TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-23
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Olivia Smith</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            olivia@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Refund
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-24
                        </TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Emma Brown</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            emma@example.com
                        </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        Sale
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        2023-06-26
                        </TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
          </div>
          <div>
            <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    About Project
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">liam@acme.com</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
  )
}

export default page


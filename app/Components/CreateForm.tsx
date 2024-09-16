"use client"
import React, {useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAccount } from "wagmi"
import { createToken, addTokenToMetaMask } from "@/Context/constants"
 
const formSchema = z.object({
  name: z.string().min(3, {message: "Token name must be at least 3 characters."}),
  symbol: z.string().min(3, {message: "Token symbol must be at least 3 characters."}).max(3, {message: "Token symbol cannot be more than 3 characters"}),
  initialSupply: z.string()
})

const CreateForm = () => {
  const {address} = useAccount();
  const [newAddress, setNewAddress] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    symbol: "",
    initialSupply: '10000000'
  },
  })
    
  async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, symbol, initialSupply } = values
        if (address) {
            try {
                const data = await createToken({name, symbol, initialSupply, address })
                const deployedTokenAddress:string = data?.logs[0].address || ''
                await addTokenToMetaMask({address: deployedTokenAddress, tokenSymbol: symbol})
                setNewAddress(deployedTokenAddress)
                console.log(data)    
            } catch (error: unknown) {
                console.log('Unable to create token:', error)
                if (error instanceof Error) {
                    alert(`Unable to create token: ${error.message}`);  // Access error.message safely
                } else {
                    alert('An unknown error occurred');
                }            
            }
        } else alert('No address detected')
    }

  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>New ERC20 Token</CardTitle>
        <CardDescription>Contract successfully created at: {newAddress} </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Token name</FormLabel>
                        <FormControl>
                        <Input placeholder="My Token" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                    <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Token symbol</FormLabel>
                        <FormControl>
                        <Input placeholder="MTK" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="initialSupply"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Initial Supply</FormLabel>
                        <FormControl>
                        <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>

        </CardContent>
    </Card>
  )
}

export default CreateForm
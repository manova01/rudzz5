"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Car, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

// Form schema
const vehicleFormSchema = z.object({
  make: z.string().min(1, { message: "Make is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  licensePlate: z.string().min(1, { message: "License plate is required" }),
  vin: z.string().optional(),
})

type VehicleFormValues = z.infer<typeof vehicleFormSchema>

export default function VehiclesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      color: "",
      licensePlate: "",
      vin: "",
    },
  })

  useEffect(() => {
    // Simulate API call to fetch vehicles
    const fetchVehicles = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setVehicles([
          {
            id: "v1",
            make: "Toyota",
            model: "Camry",
            year: "2019",
            color: "Silver",
            licensePlate: "ABC123",
            vin: "1HGCM82633A123456",
          },
          {
            id: "v2",
            make: "Honda",
            model: "Civic",
            year: "2021",
            color: "Blue",
            licensePlate: "XYZ789",
            vin: "2HGFG12567H123456",
          },
        ])
      } catch (error) {
        console.error("Error fetching vehicles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const onAddVehicle = async (data: VehicleFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to add a vehicle
      console.log("Add vehicle data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Add new vehicle to the list
      const newVehicle = {
        id: `v${vehicles.length + 1}`,
        ...data,
      }

      setVehicles([...vehicles, newVehicle])

      toast.success("Vehicle added successfully", {
        description: `${data.year} ${data.make} ${data.model} has been added to your account.`,
      })

      // Close dialog and reset form
      setIsAddDialogOpen(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to add vehicle", {
        description: "There was an error adding your vehicle. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onEditVehicle = async (data: VehicleFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to update a vehicle
      console.log("Edit vehicle data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update vehicle in the list
      const updatedVehicles = vehicles.map((vehicle) =>
        vehicle.id === selectedVehicle.id ? { ...vehicle, ...data } : vehicle,
      )

      setVehicles(updatedVehicles)

      toast.success("Vehicle updated successfully", {
        description: `${data.year} ${data.make} ${data.model} has been updated.`,
      })

      // Close dialog and reset form
      setIsEditDialogOpen(false)
    } catch (error) {
      toast.error("Failed to update vehicle", {
        description: "There was an error updating your vehicle. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onDeleteVehicle = async () => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to delete a vehicle
      console.log("Delete vehicle:", selectedVehicle)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Remove vehicle from the list
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== selectedVehicle.id)

      setVehicles(updatedVehicles)

      toast.success("Vehicle deleted successfully", {
        description: `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model} has been removed from your account.`,
      })

      // Close dialog
      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast.error("Failed to delete vehicle", {
        description: "There was an error deleting your vehicle. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle)
    form.reset({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
      vin: vehicle.vin,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Dashboard</span>
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">My Vehicles</h1>
              </div>
              <Button
                onClick={() => {
                  form.reset()
                  setIsAddDialogOpen(true)
                }}
                className="bg-rudzz-blue hover:bg-rudzz-blue/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : vehicles.length > 0 ? (
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                          <Car className="h-8 w-8 text-rudzz-blue" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-1 text-sm text-gray-500 sm:grid-cols-2">
                            <div>
                              <span className="font-medium">Color:</span> {vehicle.color}
                            </div>
                            <div>
                              <span className="font-medium">License Plate:</span> {vehicle.licensePlate}
                            </div>
                            {vehicle.vin && (
                              <div className="sm:col-span-2">
                                <span className="font-medium">VIN:</span> {vehicle.vin}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(vehicle)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteClick(vehicle)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Car className="mb-2 h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium">No Vehicles Added</h3>
                  <p className="mb-4 text-center text-gray-500">You haven't added any vehicles to your account yet.</p>
                  <Button
                    onClick={() => {
                      form.reset()
                      setIsAddDialogOpen(true)
                    }}
                    className="bg-rudzz-blue hover:bg-rudzz-blue/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Vehicle
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Add Vehicle Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Vehicle</DialogTitle>
            <DialogDescription>Enter your vehicle details below.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddVehicle)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input placeholder="Toyota" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Camry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Silver" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Plate</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIN (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="1HGCM82633A123456" {...field} />
                    </FormControl>
                    <FormDescription>Vehicle Identification Number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-rudzz-blue hover:bg-rudzz-blue/90" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Vehicle"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>Update your vehicle details below.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditVehicle)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Plate</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIN (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Vehicle Identification Number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-rudzz-blue hover:bg-rudzz-blue/90" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Vehicle Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <div className="py-4">
              <p className="font-medium">
                {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </p>
              <p className="text-sm text-gray-500">License Plate: {selectedVehicle.licensePlate}</p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={onDeleteVehicle} disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete Vehicle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}


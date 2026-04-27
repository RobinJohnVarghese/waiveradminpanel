"use client";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDetails } from "@/lib/types";
import toast from "react-hot-toast";
import { UserFormData, userSchema } from "@/utils/schema/user.schema";
import ValidationErrorMessage from "@/components/custom-component/validation-error-message";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

interface Props {
  initialData: UserDetails;
}

export const NewUserForm = ({ initialData }: Props) => {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<any>(false);

  const defaultValues =
    initialData && initialData.id
      ? {
          ...initialData,
          location: initialData?.location_name,
        }
      : {};
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  async function onSubmit(data: UserFormData) {
    if (data.status === "BCD") {
      data.is_active = false;
    } else {
      data.is_active = true;
    }
    setIsLoading(true);
    if (initialData && initialData.id) {
      await axios
        .put(`${process.env.BACKEND_URL}/api/v1/staff/user-management/`, data, {
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          toast.success("success");
          router.push("/users");
          router.refresh();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error.data);
          setErrorMessages(error.response.data.error);
          toast.error("failed");
        });
    } else {
      await axios
        .post(
          `${process.env.BACKEND_URL}/api/v1/staff/user-management/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.data?.accessToken}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          toast.success("success");
          router.push("/users");
          router.refresh();
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("failed");
          setErrorMessages(error.response.data.error);
          // console.log(error.data);
        });
    }
  }
  console.log("errorMessages", errorMessages);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyCLEfEp-SLiapNoQ9waRFFDFun4g-HawU8",
    libraries: ["places"],
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      const address = place.formatted_address || "";
      console.log({ place });
      form.setValue("location", address, {
        shouldValidate: true,
        shouldDirty: true,
      });
      console.log(place.formatted_address, "---this");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>User Name </FormLabel>
                <Input
                  placeholder="Full Name"
                  {...field}
                  value={field.value ? field.value.toUpperCase() : ""}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Phone Number</FormLabel>
                <Input type="number" placeholder="Phone Number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email Address</FormLabel>
                <Input type="email" placeholder="Email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referral_code"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Referral ID</FormLabel>
                <Input placeholder="Referral ID (Optional)" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Location</FormLabel>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <Input placeholder="Location" {...field} />
                </Autocomplete>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ATV">Active</SelectItem>
                    <SelectItem value="BCD">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ValidationErrorMessage errorMessages={errorMessages} />
        <Button variant="default" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

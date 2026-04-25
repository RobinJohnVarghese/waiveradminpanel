"use client";

import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Eye, Star, User, MessageCircle, Car, Calendar, Key, ClipboardList, MapPin, Timer, DollarSign, CheckCircle, XCircle, BadgeDollarSign, } from "lucide-react";
import dayjs from "dayjs";

export default function WaiverReportDialog({ report }: { report: any }) {
    return (
        <Dialog>
            <DialogTrigger className="p-2 text-gray-600 hover:text-gray-900 transition">
                <Eye className="w-5 h-5" />
            </DialogTrigger>

            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Waiver Report</DialogTitle>
                    <DialogDescription>Ride ID: {report.id}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Driver & Passenger */}
                    <div className="border-b pb-2">
                        <h3 className="font-semibold">Chauffeur & Passenger</h3>
                        <p className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <strong>Driver:</strong> {report.driver_name}
                        </p>
                        <p className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <strong>Passenger:</strong> {report.passenger_name}
                        </p>
                    </div>

                    {/* Vehicle Details */}
                    {report.vehicle_details && (
                        <div className="border-b pb-2">
                            <h3 className="font-semibold">Vehicle Information</h3>
                            <p className="flex items-center gap-2">
                                <Car className="w-4 h-4 text-gray-500" />
                                <strong>Model:</strong> {report.vehicle_details.name} ({report.vehicle_details.vehicle_type})
                            </p>
                            <p className="flex items-center gap-2">
                                <Key className="w-4 h-4 text-gray-500" />
                                <strong>Registration:</strong> {report.vehicle_details.registration_number}
                            </p>
                        </div>
                    )}

                    {/* Ride Details */}
                    <div className="border-b pb-2">
                        <h3 className="font-semibold">Ride Information</h3>
                        <p className="flex items-center gap-2">
                            <ClipboardList className="w-4 h-4 text-gray-500" />
                            <strong>Ride Type:</strong> {report.ride_type}
                        </p>
                        <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <strong>Start Time:</strong> {dayjs(report.start_time).format("DD MMM YYYY, hh:mm A")}
                        </p>
                        <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <strong>End Time:</strong> {dayjs(report.end_time).format("DD MMM YYYY, hh:mm A")}
                        </p>
                        <p className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-gray-500" />
                            <strong>Duration:</strong> {report.duration} seconds
                        </p>
                    </div>

                    {/* Location Details */}
                    <div className="border-b pb-2">
                        <h3 className="font-semibold">Location</h3>
                        <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-500" />
                            <span><strong>From:</strong> {report.start_location}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span><strong>To:</strong> {report.end_location}</span>
                        </p>
                    </div>

                    {/* Payment Details */}
                    <div className="border-b pb-2">
                        <h3 className="font-semibold">Payment</h3>
                        <p className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <strong>Amount:</strong> ${report.amount}
                        </p>
                        <p className="flex items-center gap-2">
                            <BadgeDollarSign className="w-4 h-4 text-blue-500" />
                            <strong>Waiver Charge:</strong> ${report.payment_details.waiver_charge}
                        </p>
                        <p className="flex items-center gap-2">
                            {report.is_paid ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <strong>Payment Status:</strong> {report.is_paid ? "Paid" : "Unpaid"}
                        </p>
                    </div>

                    {/* Review & Rating */}
                    <div>
                        <h3 className="font-semibold">Review</h3>
                        <p className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <strong>Rating:</strong> {report.rating} / 5
                        </p>
                        {report.review ? (
                            <p className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-gray-500" />
                                <strong>Comment:</strong> {report.review}
                            </p>
                        ) : (
                            <p className="text-gray-500 italic">No review provided.</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

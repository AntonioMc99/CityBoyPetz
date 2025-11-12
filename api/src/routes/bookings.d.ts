import { Schema } from 'mongoose';
declare const _default: import("mongoose").Model<{
    email: string;
    name: string;
    date: string;
    time: string;
    reason: string;
    status: "pending" | "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    email: string;
    name: string;
    date: string;
    time: string;
    reason: string;
    status: "pending" | "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    email: string;
    name: string;
    date: string;
    time: string;
    reason: string;
    status: "pending" | "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    email: string;
    name: string;
    date: string;
    time: string;
    reason: string;
    status: "pending" | "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    email: string;
    name: string;
    date: string;
    time: string;
    reason: string;
    status: "pending" | "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    email: string;
    name: string;
    date: string;
    time: string;
    reason: string;
    status: "pending" | "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=bookings.d.ts.map
export interface service {
    name : string | null;
    image : string | null;
    url : string | null
}

export interface appointment{
    doctor_id? : string | null,
    patient_id? :string | null,
    service_id ?: string | null,
    reason_for_appointment?: string | null,
    appointment_date ?:string | null,
    appointment_time ?: string|null,
    status? : string | null,
    doctor_schedule_id? : string | null
}

export interface singleAppnt{
    patient_id? :string | null
}

export interface patient_details{
    user_id?:any,
    patient_email_address?:any,
    patient_first_name?:any,
    patient_last_name?:any,
    patient_date_of_birth?:any,
    patient_gender?:any,
    patient_address?:any,
    patient_phone_no?:any,
    patient_marital_status?:any,
    patient_added_on?:any};

export interface doctor_details{
    user_id : any,
    service_provided : any,
    doctor_email_address : any,
    doctor_name : any,
    doctor_phone_no : any,
    doctor_address : any,
    doctor_date_of_birth : any,
    doctor_degree : any,
    doctor_expert_in : any,
    doctor_added_on : any,
}

export interface admin_details{
    user_id?:any,
    hospital_email?:any,
    admin_name?:any,
    hospital_name?:any,
    hospital_address?:any,
    hospital_contact_no?:any,
}
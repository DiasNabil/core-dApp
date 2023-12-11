import TemplateDashboard from "@/components/asso/dashboard/templateDashboard";


export default function template({children}){

    return(

        <TemplateDashboard>
            {children}
        </TemplateDashboard>
    )
}

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PerfilPuestoForm } from "@/components/dashboard/perfiles-puesto/PerfilPuestoForm";
import { useParams } from "react-router-dom";

const PerfilPuestoEditar = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <DashboardLayout>
      <PerfilPuestoForm perfilId={id} />
    </DashboardLayout>
  );
};

export default PerfilPuestoEditar;

import BreadCrumb from "@/components/breadcrumb";

const NewEvent = () => {
  const breadcrumbItems = [{ title: 'Criar Novo Evento', link: '/new' }];

  return (
    <>
      <div className="flex-1 space-y-4 bg-card/80 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
      </div>
    </>
  );
}

export default NewEvent;
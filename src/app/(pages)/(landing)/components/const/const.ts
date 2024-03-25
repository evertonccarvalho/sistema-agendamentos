import type { Pricing } from "../PricingCard";
import type { Team } from "../TeamCard";
import type { Testimonial } from "../TestimonialsCard";

export const pricingList: Pricing[] = [
  {
    title: "Gratuito",
    popular: 0,
    price: 0,
    description: "Para iniciantes com agendamentos básicos.",
    buttonText: "Comece Grátis",
    benefitList: [
      "Um tipo de evento com reuniões ilimitadas",
      "Conecte um calendário e integrações básicas",
      "Personalize sua página de agendamento",
    ],
  },
  {
    title: "Padrão",
    popular: 1,
    price: 10,
    description: "Para necessidades de agendamento mais sofisticadas.",
    buttonText: "Iniciar Teste Grátis",
    benefitList: [
      "Tipos de evento ilimitados com reuniões ilimitadas",
      "Múltiplos calendários para disponibilidade e agendamento",
      "Integrações com Hubspot, PayPal, Stripe e mais",
      "Tipos de evento em grupo e coletivo",
      "Lembretes, solicitações de reconfirmação e fluxos de trabalho",
      "Mais personalização de sua página de agendamento e e-mails",
      "Suporte por chat ao vivo 24/7",
    ],
  },
  {
    title: "Equipes",
    popular: 0,
    price: 16,
    description: "Para equipes que precisam de recursos avançados.",
    buttonText: "Experimente Gratuitamente",
    benefitList: [
      "Conecte-se ao Salesforce para transferir dados de reuniões",
      "Eventos de rodízio",
      "Encaminhe leads para o calendário certo",
      "Recursos administrativos para gerenciamento de eventos",
      "Autenticação Única (SSO) opcional para simplificar o acesso da equipe",
    ],
  },
];

export const teamList: Team[] = [
  {
    imageUrl: "/everton.jpeg",
    name: "Éverton Carvalho",
    position: "Full Stack Developer",
    description: "Desenvolvedor Full Stack com experiência em construção de aplicativos web e móveis.",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com/in/everton-c-carvalho" },
      { name: "Github", url: "https://github.com/evertonccarvalho" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=35",
    name: "Emma Smith",
    position: "Product Manager",
    description: "Gerente de Produto com experiência em liderança de equipes multifuncionais.",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com/in/everton-c-carvalho" },
      { name: "Github", url: "https://github.com/evertonccarvalho" },
      { name: "Instagram", url: "https://www.instagram.com/" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=36",
    name: "Ashley Ross",
    position: "Frontend Developer",
    description: "Desenvolvedor Frontend apaixonado por criar interfaces de usuário intuitivas.",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com/in/everton-c-carvalho" },
      { name: "Instagram", url: "https://www.instagram.com/" },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=17",
    name: "Bruce Rogers",
    position: "Backend Developer",
    description: "Desenvolvedor Backend com experiência em construção e manutenção de sistemas robustos.",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com/in/everton-c-carvalho" },
      { name: "Github", url: "https://github.com/evertonccarvalho" },
    ],
  },
];



export const testimonialsList: Testimonial[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "Paulo Oliveira",
    userName: "@paulo_oliveira",
    comment:
      "Nunca mais perdi uma reunião importante!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Maria da Silva",
    userName: "@maria_silva",
    comment:
      "Este sistema de agendamentos simplificou minha vida! Finalmente, consigo gerenciar meus compromissos de forma eficiente.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "José Santos",
    userName: "@jose_santos",
    comment:
      "Estou muito impressionado com a facilidade de uso deste sistema de agendamentos. Agora posso organizar minha agenda com apenas alguns cliques!",
  },

  {
    image: "https://github.com/shadcn.png",
    name: "Ana Oliveira",
    userName: "@ana_oliveira",
    comment:
      "Este sistema de agendamentos superou minhas expectativas! Nunca foi tão simples marcar compromissos e nunca mais perdi uma reunião importante.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Carlos Souza",
    userName: "@carlos_souza",
    comment:
      "Estou muito satisfeito com a eficiência deste sistema de agendamentos. Agora posso gerenciar meu tempo de forma mais produtiva e focar nas tarefas importantes.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Fernanda Lima",
    userName: "@fernanda_lima",
    comment:
      "Finalmente encontrei um sistema de agendamentos que se adapta às minhas necessidades. Estou muito feliz com a praticidade e funcionalidade que oferece!",
  },

];

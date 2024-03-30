import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Testimonial {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

interface TestimonialCardProps {
  testmonial: Testimonial
}

const TestimonialCard = ({ testmonial }: TestimonialCardProps) => {
  return (<>
    <Card
      key={testmonial.userName}
      className="max-w-md md:break-inside-avoid overflow-hidden"
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage
            alt=""
            src={testmonial.image}
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <CardTitle className="text-lg">{testmonial.name}</CardTitle>
          <CardDescription>{testmonial.userName}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>{testmonial.comment}</CardContent>
    </Card>

  </>);
}

export default TestimonialCard;
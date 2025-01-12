import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { useState } from "react";

interface ContactCardProps {
  name: string;
  department: string;
  contactNo: string;
  designation: string;
  roomNo: string;
  post: string;
}

const ContactCard = ({
  name,
  department,
  contactNo,
  designation,
  roomNo,
  post,
}: ContactCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const { toast } = useToast();

  // Function for copying the contact number
  const copyNumber = () => {
    navigator.clipboard.writeText(contactNo).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 500);

      // Trigger the toast notification
      toast({
        title: "Number Copied",
        description: `Contact number ${contactNo} has been copied to clipboard.`,
        variant: "default",
      });
    });
  };

  return (
    <div className="container p-1 mx-auto">
      <Card className="bg-[#FEF9F5] rounded-md w-full sm:w-96 cursor-pointer p-0">
        <CardHeader className="-mt-4 text-center text-slate-800">
          <CardTitle className="text-sm font-semibold tracking-wide sm:text-xl text-balance">
            {name} | {department}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="-mt-2 space-y-2 text-sm font-semibold leading-5 text-slate-800 sm:text-xl">
            {/* Contact Number Button */}
            <p className="flex items-center justify-between gap-2">
              <span>Contact No:</span>
              <Button
                size={"sm"}
                variant={"outline"}
                title="Click to copy"
                onClick={copyNumber}
                className="flex items-center space-x-2"
              >
                <span>{isCopied ? "Copied!" : contactNo}</span>
                <Copy size={10} className="text-gray-600" />
              </Button>
            </p>

            {/* Designation */}
            <p className="flex justify-between tracking-wide text-slate-800">
              Designation:
              <span>{designation}</span>
            </p>

            {/* Room No */}
            <p className="flex justify-between tracking-wide text-slate-800">
              Room No:
              <span>{roomNo}</span>
            </p>

            {/* Post */}
            <p className="flex justify-between tracking-wide text-slate-800">
              Post:
              <span>{post}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-slate-800">Contact Info</CardFooter>
      </Card>
    </div>
  );
};

export default ContactCard;

import { Sidebar } from ".";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { IoMenuSharp } from "react-icons/io5";

export function Slider() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoMenuSharp />
      </SheetTrigger>
      <SheetContent side={"left"}>
      
        <div className="grid gap-4 py-4">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}

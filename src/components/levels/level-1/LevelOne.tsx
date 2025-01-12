import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Directory } from "@/lib/types/type";
import { useEffect, useRef, useState } from "react";

interface LevelOneProps {
  apiData: Directory;
}

const LevelOne = ({ apiData }: LevelOneProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null); // Store selected accordion ID
  const [isMobile, setIsMobile] = useState(false); // Flag to detect mobile screen size
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for scroll container

  // Detect screen size for mobile behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425); // Adjust breakpoint as needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle accordion open/close
  const handleToggle = (id: number) => {
    setSelectedId(selectedId === id ? null : id); // Set selected ID to toggle accordion state
  };

  // Render children recursively if they exist
  const renderChildrens = (childrens: Directory[]) => {
    if (childrens.length === 0) return null; // Return null if no children to render

    return (
      <Accordion type="single" collapsible>
        {childrens.map((child) => (
          <AccordionItem key={child.id} value={`${child.id}`}>
            <AccordionTrigger
              className="flex items-center justify-between m-1 mt-2 text-sm font-semibold sm:text-lg no-scrollbar"
              style={{ color: child.color || "inherit" }}
            >
              {child.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="py-4 overflow-auto rounded-md max-h-72">
                {renderChildrens(child.childrens)}{" "}
                {/* Recursively render children */}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  // Find the selected accordion and other accordions
  const openAccordion = apiData.childrens.find(
    (child) => child.id === selectedId
  );
  const otherAccordions = apiData.childrens.filter(
    (child) => child.id !== selectedId
  );

  return (
    <div className="w-full pt-8">
      <div className="container mx-auto p-4 bg-[#FEF9F5] rounded-md">
        {isMobile ? (
          <>
            {/* Custom horizontally scrollable area for mobile */}
            <div
              ref={scrollContainerRef}
              className="flex w-full space-x-4 overflow-x-auto whitespace-nowrap no-scrollbar cursor-grab"
              onMouseDown={(e) => {
                const container = scrollContainerRef.current;
                if (!container) return;

                container.style.scrollBehavior = "auto";
                const startX = e.pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;
                const handleMouseMove = (e: MouseEvent) => {
                  const x = e.pageX - container.offsetLeft;
                  const walk = x - startX;
                  container.scrollLeft = scrollLeft - walk;
                };

                const handleMouseUp = () => {
                  container.style.scrollBehavior = "smooth";
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
              onTouchStart={(e) => {
                const container = scrollContainerRef.current;
                if (!container) return;

                container.style.scrollBehavior = "auto";
                const startX = e.touches[0].pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;

                const handleTouchMove = (e: TouchEvent) => {
                  const x = e.touches[0].pageX - container.offsetLeft;
                  const walk = x - startX;
                  container.scrollLeft = scrollLeft - walk;
                };

                const handleTouchEnd = () => {
                  container.style.scrollBehavior = "smooth";
                  document.removeEventListener("touchmove", handleTouchMove);
                  document.removeEventListener("touchend", handleTouchEnd);
                };

                document.addEventListener("touchmove", handleTouchMove);
                document.addEventListener("touchend", handleTouchEnd);
              }}
            >
              {otherAccordions.map((child) => (
                <div
                  key={child.id}
                  className="text-sm font-semibold transition-all duration-200 cursor-pointer sm:text-lg"
                  style={{ color: child.color || "inherit" }}
                  onClick={() => handleToggle(child.id)}
                >
                  {child.name}
                </div>
              ))}
            </div>

            {/* Currently open accordion */}
            {openAccordion && (
              <div className="mt-8">
                <Accordion type="single" collapsible>
                  <AccordionItem value={`${openAccordion.id}`}>
                    <AccordionTrigger
                      className="flex items-center justify-between m-1 mt-2 text-sm font-semibold sm:text-lg"
                      style={{ color: openAccordion.color || "inherit" }}
                    >
                      {openAccordion.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-2 py-4 overflow-auto rounded-md max-h-72 ">
                        {renderChildrens(openAccordion.childrens)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </>
        ) : (
          // Default behavior for larger screens
          <div className="overflow-y-auto max-h-[80vh] no-scrollbar">
            {renderChildrens(apiData.childrens)} {/* Render all children */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelOne;

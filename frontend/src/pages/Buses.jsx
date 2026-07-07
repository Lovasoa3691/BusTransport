import { useState } from "react";
import SubTab from "../components/common/subTab";
import BusList from "./buses/busList";
import LineList from "./lines/lineList";
import StopList from "./stops/stopList";

export default function BusesContent() {
  const [subTab, setSubTab] = useState("buses");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-y-6">
      <SubTab
        subTab={subTab}
        setSubTab={setSubTab}
        setIsModalOpen={setIsModalOpen}
      />

      {subTab === "buses" && (
        <BusList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
      {subTab === "lines" && (
        <LineList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
      {subTab === "stops" && (
        <StopList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

import axios from "axios";
import { followingSchema } from "../components/following/schema";
import { DataTableDemo } from "../components/following/Table";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Lottie from "lottie-react";
import NotFoundImg from '../assets/img/404-not-found.json';

const Following = () => {
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState([]);

  const getFollowingData = async () => {
    try {
      const { data } = await axios.get("/subscribed/");
      console.log(data);
      setData(data.payload);
      setFetched(true);
    } catch (error) {
      toast.error(error.message);
      setFetched(true);
    }
  };
  console.log(data);

  useEffect(() => {
    getFollowingData();
  }, []);

  return (
    <div>
      {fetched && data.length > 0 && (
        <DataTableDemo
          setData={setData}
          data={data}
          columns={followingSchema.columns}
        />
      )}
      {fetched && data.length === 0 && (
        <div className="flex flex-col items-center mt-12 md:mt-0">
          <Lottie className="md:max-w-2xl" animationData={NotFoundImg} />
          <p className="text-xl text-muted-foreground">
            You've not subcribed to any user yet
          </p>
        </div>
      )}
    </div>
  );
};

export default Following;

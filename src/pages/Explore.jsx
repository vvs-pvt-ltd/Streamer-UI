import axios from "axios";
import HomeCards from "../components/HomeCards";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../components/loader";
import AvatarImg from "../assets/img/avatar.png";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const paramValue = searchParams.get("paramName");
  //   const paramValue = "djhsbsfcvj";

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/video/search/${paramValue}`);
      if (data.status === 200) {
        console.log(data);
        setLoading(false);
        setSearchData(data.payload);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (paramValue === null) setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  // {
  //     _id: '66333e9bf2b56df31748608c',
  //     video: '66333dbdf2b56df317485f20',
  //     title: 'big buck bunny',
  //     description:
  //       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  //     thumbnail:
  //       'https://res.cloudinary.com/do8wf9ebi/image/upload/v1714645068/bbb_vexkv2.jpg',
  //     ispublic: true,
  //     createdAt: '2024-05-02T07:19:55.529Z',
  //     username: 'weshall',
  //     avatar: 'https://picsum.photos/100/100',
  //     type: 'video'
  //   },

  return (
    <div>
      {paramValue === null && <HomeCards />}

      <div className="flex flex-col gap-3">
        {searchData.length > 0 &&
          searchData.map((item, index) => (
            <div key={index}>
              {item.type === "channel" ? (
                <Link to={"/" + item.username}>
                  <div className="w-full transition-all ease-in-out duration-300 border rounded-lg py-4 px-6 hover:bg-muted cursor-pointer">
                    <div className="flex items-center justify-start gap-6">
                      <div className="rounded-full w-28 h-28 overflow-hidden">
                        <img
                          src={item.avatar ? item.avatar : AvatarImg}
                          className="w-full h-full"
                          alt="Vivek Sahu"
                        />
                      </div>
                      <div className="leading-tight">
                        <p className="text-2xl font-semibold capitalize">
                          {item.name ? item.name : "No Username"}
                        </p>
                        <p>@{item.username ? item.username : "No Username"}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={`/video/${item._id}`}>
                  <div className="w-full transition-all ease-in-out duration-300 border rounded-lg py-4 px-6 hover:bg-muted cursor-pointer">
                    <div className="flex gap-4">
                      <img
                        src={item.thumbnail}
                        className="aspect-video w-64"
                        alt="video title"
                      />
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-2xl font-semibold capitalize">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground">
                          {item.description.length > 200
                            ? item.description.slice(0, 200) + "...."
                            : item.description}
                        </p>
                        <div className="flex items-center justify-start gap-2">
                          <div className="rounded-full w-14 h-14 overflow-hidden">
                            <img
                              src={item.avatar ? item.avatar : AvatarImg}
                              alt={
                                item.username ? item.username : "No Username"
                              }
                            />
                          </div>
                          <div className="leading-tight">
                            <p className="text-lg font-semibold">Vivek Sahu</p>
                            <p className="text-sm">
                              @{item.username ? item.username : "No Username"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Explore;

// @ts-nocheck

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import isEqual from "lodash/isEqual";
import styled from "styled-components";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { AiOutlineUsergroupAdd } from "@react-icons/all-files/ai/AiOutlineUsergroupAdd";
import { useGetCurrentUserDashboardQuery } from "../client/graphql/getCurrentUserDashboard.generated";
import {
  KoiSVG,
  Title,
  media,
  SubTitle,
  priceStyling,
  Card,
} from "../client/components/utils/styledComponents";
import PolarAreaContainer from "../client/components/Home/PolarAreaContainer";

const StyledTitle = styled(Title)`
  padding-top: 1rem;

  ${media.lg} {
    padding-top: 2rem;
  }
`;
const StyledCard = styled(Card)`
  margin-top: 1rem;
  ${media.lg} {
    margin-top: 1.5rem;
  }
`;
export const Text = styled.div`
  padding: 0.5rem;

  ${media.lg} {
    padding: 1rem;
    padding-top: 0rem;
  }
`;

export const KoiIcon = (props) => <KoiSVG {...props} />;

export const links = [
  {
    title: "My koi",
    path: "/koi",
  },
  {
    title: "Add koi",
    path: "/koi/create",
    icon: <AiOutlinePlus />,
  },
  {
    title: "Varieties",
    path: "/varieties",
    icon: <AiOutlineApartment />,
  },

  {
    title: "Friends",
    path: "/friends",
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    title: "Settings",
    path: "/app/settings",
    icon: <AiOutlineSetting />,
  },
];

const getTotalKoiValue = (kois) => {
  let totalValue = 0;
  kois.map(({ purchasePrice }) => {
    if (purchasePrice) {
      totalValue = totalValue + purchasePrice;
    }
  });
  return totalValue;
};

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserDashboardQuery();
  const [kois, setKois] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("kois")) {
        setKois(JSON.parse(localStorage.getItem("kois")));
      }
    }
  }, []);

  useEffect(() => {
    if (data?.currentUser && !isEqual(data.currentUser.kois, kois)) {
      setKois(data.currentUser.kois);
      window.localStorage.setItem(
        "kois",
        JSON.stringify(data.currentUser.kois)
      );
    }
  }, [data]);

  if (fetching && kois.length == 0)
    return (
      <>
        <StyledTitle>Hello</StyledTitle>
        <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3"></div>
      </>
    );

  if (error) return <p>{error.message}</p>;

  if (!data?.currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }

  return (
    <>
      <StyledTitle>Hello {data.currentUser.name}!</StyledTitle>
      <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
        <PolarAreaContainer kois={kois} />
        <StyledCard>
          <SubTitle>Koi value</SubTitle>
          <Text>
            Your total value of koi is{" "}
            <b>{priceStyling(getTotalKoiValue(kois), 0)}</b>, which is an
            average of{" "}
            <b>{priceStyling(getTotalKoiValue(kois) / kois.length, 0)}</b>
          </Text>
        </StyledCard>
      </div>
    </>
  );
}

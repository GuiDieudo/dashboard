// @ts-nocheck
import React from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { Line } from "react-chartjs-2";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Card, SubTitle, media, Title } from "../utils/styledComponents";
import { StyledCard, CardContainer, options } from "./Evolution";

const StyledSkeleton = styled(Skeleton)`
  background: rgba(58, 56, 120, 0.6);
  transform: scale(1, 1);
  border-radius: 20px;
`;
const StyledTitle = styled(Title)`
  padding-bottom: 1rem;

  ${media.lg} {
    padding-bottom: 1.5rem;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  padding-top: 160%;

  :hover {
    cursor: pointer;
  }
`;

const SkeletonTextDate = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  height: 1rem;
`;

const SkeletonTextSize = styled.div`
  height: 1.5rem;
  color: ${(props) => props.theme.mainColor};
`;
const Container = styled.div`
  margin-right: 1rem;
`;
const VideoSize = styled.div`
  padding-top: 56.25%;
`;

const data = {
  datasets: [
    {
      label: "Size Evolution",
      data: [],
      borderColor: "#3A3878",
      backgroundColor: "#3A3878",
      tension: 0.4,
    },
  ],
};

const Loading = () => {
  return (
    <>
      <Breadcrumbs
        links={[
          { to: `/koi`, text: "All koi" },
          { to: `/varieties`, text: "Varieties" },
        ]}
        currentBreadcrumbText=""
      />
      <StyledTitle>
        <StyledSkeleton width="300px" />
      </StyledTitle>
      <CardContainer>
        <Card>
          <SubTitle>Koi evolution</SubTitle>
        </Card>
      </CardContainer>
      {/* <div className="cp-c-row cp-c-align-start-start cp-c-md-align-center-center">
            {new Array(2).fill("a").map((a, index) => (
              <Container
                key={index}
                className="cp-i-33 cp-i-md-25 cp-i-lg-20 cp-i-xl-15"
              >
                <StyledSkeleton width="100%">
                  <ImageContainer />
                </StyledSkeleton>
                <StyledSkeleton width="100%">
                  <SkeletonTextDate />
                </StyledSkeleton>
                <StyledSkeleton width="100%">
                  <SkeletonTextSize />
                </StyledSkeleton>
              </Container>
            ))}
          </div> */}

      {/* <div className="cp-c-row cp-c-padding-2 cp-c-lg-padding-3 cp-c-wrap">
        <div className="cp-i-100 cp-i-md-50">
          <StyledCard>
            <VideoSize />
          </StyledCard>
        </div>
        <div className="cp-i-100 cp-i-md-50">
          <Card>
            <Line data={data} options={options} />
          </Card>
        </div>
      </div> */}
    </>
  );
};

export default Loading;

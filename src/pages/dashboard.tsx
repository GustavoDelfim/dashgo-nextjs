import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-06-07T00:00:00.000Z',
      '2022-06-08T00:00:00.000Z',
      '2022-06-09T00:00:00.000Z',
      '2022-06-10T00:00:00.000Z',
      '2022-06-11T00:00:00.000Z',
      '2022-06-12T00:00:00.000Z',
      '2022-06-13T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: .3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: .7,
      opacityTo: .3
    }
  }
}

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 51, 18, 30] }
]

export default function Dashboard () {
  return (
    <Flex
      direction="column"
      h="100vh"
    >
      <Header />

      <Flex
        w="100%"
        my="6"
        maxW="1480"
        mx="auto"
        px="6"
      >
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box
            p="8"
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4"> Inscritos da semana </Text>
            <Chart
              type="area"
              height={160}
              options={options}
              series={series}
            />
          </Box>
          <Box
            p="8"
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4"> Taxa de abertura </Text>
            <Chart
              type="area"
              height={160}
              options={options}
              series={series}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
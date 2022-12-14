import { Box, Button, HStack, NumberInput, NumberInputField, Text, useClipboard } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useLocale } from "../../hooks/useLocale"
import { generateRandomSeed } from "../../utils/random"
import BrandButton from "../common/brandButton"
import BrandNumberInput from "../common/brandNumberInput"
import CopyIconButton from "../common/copyIconButton"

const SeedGeneratorWidget = () => {
    const { t } = useLocale()
    const [seed, setSeed] = useState("123456789")

    const generate = () => {
        const random = generateRandomSeed(1, 4294967295)
        setSeed(random.toString())
    }

    useEffect(() => {
        generate()
    }, [])

    return (
        <Box my={"2"}>
            <Text p={"2"} fontWeight={"semibold"}>
                {t.SEED_GENERATOR}
            </Text>

            <HStack>
                <BrandNumberInput
                    w={"full"}
                    value={seed}
                    onChange={(e) => {
                        setSeed(e)
                    }}
                    allowMouseWheel
                >
                    <NumberInputField />
                </BrandNumberInput>
                <Button
                    w={"16"}
                    fontSize={"xl"}
                    variant={"outline"}
                    colorScheme={"brand"}
                    onClick={() => {
                        generate()
                    }}
                >
                    <Icon icon={"bx:dice-3"} />
                </Button>
                <CopyIconButton w={"14"} value={seed} />
            </HStack>
        </Box>
    )
}

export default SeedGeneratorWidget

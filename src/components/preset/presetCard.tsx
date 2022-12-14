import { Button, Divider, HStack, Spacer, Text, useClipboard } from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useMemo } from "react"
import { useCurrentPromptState } from "../../atoms/currentPromptState"
import { useLocale } from "../../hooks/useLocale"
import { usePrompts } from "../../hooks/usePrompts"
import { Prompt } from "../../types/prompt"
import { compileSpells } from "../../utils/prompt"
import BrandButton from "../common/brandButton"
import CopyIconButton from "../common/copyIconButton"
import MainBox from "../common/mainBox"

interface Props {
    prompt: Prompt
}

const PresetCard = ({ prompt }: Props) => {
    const { t } = useLocale()

    const compiled = useMemo(() => {
        return compileSpells(prompt.spells)
    }, [prompt])

    const { deletePrompt } = usePrompts()
    const { appendSpells } = useCurrentPromptState()

    return (
        <MainBox rounded={"md"}>
            <HStack px={"2"} pt={"2"}>
                <Text py={"1"} pl={"2"} fontWeight={"semibold"}>
                    {prompt.title}
                </Text>
                <Spacer />
                <Button title={t.EDIT_PROMPT} variant={"outline"} colorScheme={"brand"} fontSize={"2xl"}>
                    <Icon icon={"ant-design:edit-outlined"} />
                </Button>
            </HStack>
            <Text mx={4} mb={"2"} color={"GrayText"} whiteSpace={"pre"} overflow={"hidden"} textOverflow={"ellipsis"}>
                {compiled}
            </Text>
            <Divider />
            <HStack p={"2"}>
                <Button
                    title={t.DELETE_PROMPT}
                    colorScheme={"red"}
                    variant={"ghost"}
                    onClick={(e) => {
                        if (prompt.id) {
                            deletePrompt(prompt.id)
                        }
                    }}
                >
                    <Icon icon={"carbon:trash-can"} />
                </Button>
                <Spacer />

                <CopyIconButton variant={"outline"} colorScheme={"brand"} value={compiled} brand={false} />

                <BrandButton
                    title={t.LOAD_PROMPT}
                    variant={"solid"}
                    fontSize={"2xl"}
                    onClick={() => {
                        appendSpells(prompt.spells)
                    }}
                >
                    <Icon icon={"mdi:import"} />
                </BrandButton>
            </HStack>
        </MainBox>
    )
}

export default PresetCard

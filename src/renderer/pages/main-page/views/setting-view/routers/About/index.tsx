import A from "@/renderer/components/A";
import wxChannelImg from "@/assets/imgs/wechat_channel1.png";
import checkUpdate from "@/renderer/utils/check-update";
import { toast } from "react-toastify";
import "./index.scss";
import { Trans, useTranslation } from "react-i18next";
import { getGlobalContext } from "@/shared/global-context/renderer";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="setting-view--about-container">
            <div className="setting-row about-version">
                <Trans
                    i18nKey={"settings.about.current_version"}
                    values={{
                        version: getGlobalContext().appVersion,
                    }}
                ></Trans>
                <A
                    onClick={async () => {
                        const needUpdate = await checkUpdate(true);
                        if (!needUpdate) {
                            toast.success(t("settings.about.already_latest"));
                        }
                    }}
                >
                    {t("settings.about.check_update")}
                </A>
            </div>

            <div className="setting-row about-version">
                {t("settings.about.software_author")}{" "}
                <A href="https://github.com/573780986">Github@DFPD</A>
            </div>

            <div className="setting-row about-version">
                <Trans
                    i18nKey="settings.about.open_source_declaration"
                    components={{
                        Github: (
                            <A href="https://github.com/573780986/MusicFreeDesktop"></A>
                        ),
                    }}
                ></Trans>
            </div>
        </div>
    );
}

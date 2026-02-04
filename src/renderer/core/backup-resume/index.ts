import MusicSheet from "../music-sheet";
import AppConfig from "@shared/app-config/renderer";
import { setUserPreference } from "@/renderer/utils/user-perference";

/**
 * 恢复
 * @param data 数据
 * @param overwrite 是否覆写歌单
 */
async function resume(data: string | Record<string, any>, overwrite?: boolean) {
    let dataObj: any;
    if (typeof data === "string") {
        dataObj = JSON.parse(data);
    } else if (data instanceof ArrayBuffer) {
        dataObj = JSON.parse(new TextDecoder().decode(new Uint8Array(data)));
    } else if (ArrayBuffer.isView(data)) {
        dataObj = JSON.parse(
            new TextDecoder().decode(data as unknown as ArrayBufferView),
        );
    } else {
        dataObj = data;
    }

    const currentSheets = MusicSheet.frontend.getAllSheets();
    const allSheets: IMusic.IMusicSheetItem[] = Array.isArray(dataObj.musicSheets)
        ? dataObj.musicSheets
        : [];

    let importedDefaultSheet;
    for (const sheet of allSheets) {
        if (overwrite && sheet.id === MusicSheet.defaultSheet.id) {
            importedDefaultSheet = sheet;
            continue;
        }
        const newSheet = await MusicSheet.frontend.addSheet(sheet.title);
        await MusicSheet.frontend.addMusicToSheet(sheet.musicList, newSheet.id);
    }
    if (overwrite) {
        for (const sheet of currentSheets) {
            if (sheet.id === MusicSheet.defaultSheet.id) {
                if (importedDefaultSheet) {
                    await MusicSheet.frontend.clearSheet(MusicSheet.defaultSheet.id);
                    await MusicSheet.frontend.addMusicToFavorite(
                        importedDefaultSheet.musicList,
                    );
                }
            }
            await MusicSheet.frontend.removeSheet(sheet.id);
        }
    }

    if (Array.isArray(dataObj.pluginSubscription)) {
        setUserPreference(
            "subscription",
            dataObj.pluginSubscription.filter((item: any) =>
                item?.srcUrl?.match?.(/https?:\/\/.+\.js(on)?/),
            ),
        );
    }

    if (dataObj.pluginMeta && typeof dataObj.pluginMeta === "object") {
        AppConfig.setConfig({
            "private.pluginMeta": dataObj.pluginMeta,
        });
    }
}

const BackupResume = {
    resume,
};
export default BackupResume;

import {
  getInbox,
  getSentMails,
  getDraftMails,
  getTrashMails,
  getStarred,
} from "../../services/mail.service";
import { toast } from "sonner";

export const fetchInbox = async (params) => {
  const {
    mode,
    hasMore,
    loading,
    nextPageToken,
    setLoading,
    setGoogleLoading,
    setInboxMails,
    setNextPageToken,
    setHasMore,
    refresh,
  } = params;

  if (!hasMore || loading) return;
  if (mode != "inbox") return;
  setLoading(true);
  try {
    const response = await getInbox({
      pageToken: refresh ? null : nextPageToken,
    });
    const mailItems = response?.response?.data?.mails;
    const newNextPageToken = response?.response?.data?.nextPageToken;

    if (response?.response?.status === 200) {
      if (refresh) {
        setInboxMails(mailItems);
      } else {
        3;
        setInboxMails &&
          setInboxMails((prevMails) => [...prevMails, ...mailItems]);
      }
      setNextPageToken(newNextPageToken || null);
      setHasMore(!!newNextPageToken);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Failed to fetch more emails:", error);
    setHasMore(false);
  } finally {
    setLoading(false);
    setGoogleLoading(false);
  }
};

export const fetchSentMail = async (params) => {
  const {
    mode,
    hasMoreSent,
    sentMailNextPageToken,
    loading,
    setLoading,
    setSentMails,
    setSentMailNextPageToken,
    setHasMoreSent,
    setGoogleLoading,
    refresh,
  } = params;
  if (!hasMore || loading || mode !== "sent") return;
  if (loading) return;
  if (mode != "sent") return;
  if (!hasMoreSent) return;
  setLoading(true);
  const { response, error } = await getSentMails({
    pageToken: refresh ? null : sentMailNextPageToken,
  });
  if (error) {
    toast.error("Failed to get sent mails", {
      description: "Failed to get sent mails",
    });
  } else {
    if (response.message == "No messages in sent") {
      toast.info("No messages in sent", {
        description: "You have not sended any messages yet",
      });
      setLoading(false);
      setGoogleLoading(false);
      setSentMails([]);
      return;
    }
    if (refresh) {
      setSentMails(response?.data?.mails);
    } else {
      setSentMails &&
        setSentMails((prevMails) => [...prevMails, ...response?.data?.mails]);
    }
    setSentMailNextPageToken(response?.data?.nextPageToken);
    setHasMoreSent(!!response?.data?.nextPageToken);
  }
  setLoading(false);
  setGoogleLoading(false);
};

export const fetchDraftMail = async (params) => {
  const {
    mode,
    hasMore,
    loading,
    nextPageToken,
    setLoading,
    setDraftMails,
    setNextPageToken,
    setHasMore,
  } = params;
  if (!hasMore || loading || mode !== "draft") return;
  setLoading(true);
  try {
    const response = await getDraftMails({ pageToken: nextPageToken });
    const mailItems = response?.response?.data?.mails || [];
    const newNextPageToken = response?.response?.data?.nextPageToken;

    if (response?.response?.status === 200) {
      if (response.message == "No messages in drafts") {
        toast.info("No messages in drafts", {
          description: "You have no draft messages",
        });
        setLoading(false);
        setGoogleLoading(false);
        setDraftMails([]);
        return;
      }

      setDraftMails((prevMails) => [...prevMails, ...mailItems]);
      setNextPageToken(newNextPageToken || null);
      setHasMore(!!newNextPageToken);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Failed to fetch draft mails:", error);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
};

export const fetchDeletedMail = async (params) => {
  const {
    mode,
    hasMore,
    loading,
    nextPageToken,
    setLoading,
    setTrashMails,
    setNextPageToken,
    setHasMore,
  } = params;
  if (!hasMore || loading || mode !== "trash") return;
  setLoading(true);
  try {
    const response = await getTrashMails({ pageToken: nextPageToken });
    const mailItems = response?.response?.data?.mails || [];
    const newNextPageToken = response?.response?.data?.nextPageToken;

    if (response?.response?.status === 200) {
      if (response.message == "No messages in trash") {
        toast.info("No messages in trash", {
          description: "You have no deleted messages",
        });
        setLoading(false);
        setGoogleLoading(false);
        setTrashMails([]);
        return;
      }

      setTrashMails((prevMails) => [...prevMails, ...mailItems]);
      setNextPageToken(newNextPageToken || null);
      setHasMore(!!newNextPageToken);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Failed to fetch deleted mails:", error);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
};

export const fetchStarredMail = async (params) => {
  const {
    mode,
    hasMore,
    loading,
    nextPageToken,
    setLoading,
    setStarredMails,
    setNextPageToken,
    setHasMore,
  } = params;
  if (!hasMore || loading || mode !== "starred") return;
  setLoading(true);
  try {
    const response = await getStarred({ pageToken: nextPageToken });
    const mailItems = response?.response?.data?.mails || [];
    const newNextPageToken = response?.response?.data?.nextPageToken;

    if (response?.response?.status === 200) {
      if (response.message == "No messages in starred") {
        toast.info("No messages in starred", {
          description: "You have no starred messages",
        });
        setLoading(false);
        setGoogleLoading(false);
        setStarredMails([]);
        return;
      }

      setStarredMails((prevMails) => [...prevMails, ...mailItems]);
      setNextPageToken(newNextPageToken || null);
      setHasMore(!!newNextPageToken);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Failed to fetch starred mails:", error);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
};

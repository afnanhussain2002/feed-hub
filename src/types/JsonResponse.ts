export const jsonResponse = (
  success: boolean,
  message: string,
  status: number
) => {
  return Response.json(
    {
      success,
      message,
    },
    {
      status,
    }
  );
};

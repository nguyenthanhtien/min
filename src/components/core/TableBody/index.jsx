import { memo } from "react";

const TableBody = ({ data, headers, pageSize, pageNumber }) => {
  return (
    <tbody className="mcmc-tbody">
      {data?.length
        ? data.map((item, i) => (
            <tr key={`mcmc-tbody-${i}`} className="mcmc-tbody__row">
              {headers.map((header, index) => {
                const value =
                  header.key === "no"
                    ? `${pageNumber * pageSize + i + 1}.`
                    : item[header.key];

                return (
                  <td
                    key={`mcmc-bodyCell-${index}`}
                    className="mcmc-tbody__cell"
                  >
                    {header.render ? header.render(item) : <p>{value}</p>}
                  </td>
                );
              })}
            </tr>
          ))
        : null}
    </tbody>
  );
};

export default memo(TableBody);

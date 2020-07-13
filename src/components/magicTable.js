import React from 'react';
import { Table,IconButton, TextInput, Text, Combobox} from 'evergreen-ui';
export default function MagicTable({ columns, data, pagination,rowRenderProps}) {

    const [pageSize,setPageSize] = React.useState(10);
    const [currentPage,setCurrentPage] = React.useState(1);
    const lastPage = Math.floor(data.length/pageSize)+1;
    const rangeStart = (currentPage-1)*pageSize;
    const rangeEnd = currentPage*pageSize<data.length?currentPage*pageSize:data.length;
    const dataView = data.slice(rangeStart,rangeEnd);
    return (
        <>
            <Table>
                <Table.Head>
                    {columns.map(column => (
                        <Table.TextHeaderCell> {column['label']} </Table.TextHeaderCell>
                    ))}
                </Table.Head>
                <Table.Body>
                    {
                        dataView.map(d => (
                            <Table.Row {...rowRenderProps(d)}>
                                {
                                    columns.map(column => (
                                        <Table.TextCell>
                                            {d[column['id']]}
                                        </Table.TextCell>
                                    ))
                                }
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            {pagination ?
                <div className="d-flex justify-content-end mt-3">
                    <Combobox
                        openOnFocus
                        selectedItem={pageSize}
                        items={[5, 8, 10, 15, 18]}
                        onChange={selected => setPageSize(selected)}
                        placeholder="Size"
                        className="mr-2"
                        width={120}
                        height={32}
                    />
                    <IconButton
                        icon="chevron-backward"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        disabled={currentPage === 1 ? true : false}
                        onClick={() =>  setCurrentPage(1)}
                    />
                    <IconButton
                        icon="chevron-left"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        disabled={currentPage === 1 ? true : false}
                        onClick={() => setCurrentPage(currentPage-1)}
                    />

                    <TextInput
                        value={currentPage}
                        width={48}
                        className="mr-2" />
                    <Text size={700} className="mr-2 mt-1"> / </Text>
                    <TextInput
                        value={lastPage}
                        width={48}
                        className="mr-2" />
                    <IconButton
                        icon="chevron-right"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        onClick={() => setCurrentPage(currentPage+1)}
                        disabled={currentPage === lastPage ? true : false}
                    />
                    <IconButton
                        icon="chevron-forward"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        disabled={currentPage === lastPage ? true : false}
                        onClick={() => setCurrentPage(lastPage)}
                    />
                </div>
                : null}
        </>
    )
}
from .configuration_service import OPERATORS, SELF_OPERATORS
import numpy as np


def add_new_column(data, operation, columns, parameter):
    is_in_operators = (len(np.where(OPERATORS == operation)[0]) == 1)
    is_in_self_operators = (len(np.where(SELF_OPERATORS == operation)[0]) == 1)
    name = ""
    errors = []
    if is_in_operators:
        data, name, errors = __generate_operator_column(operation, data, columns)

    if is_in_self_operators:
        data, name, errors = __generate_self_operator_column(operation, data, columns, parameter)

    return data, name, errors


def __generate_operator_column(operation, data, columns):
    new_column = None
    errors = []
    name = ""
    try:
        if operation == "+":
            new_column = data[columns[0]] + data[columns[1]]

        if operation == "-":
            new_column = data[columns[0]] - data[columns[1]]

        if operation == "*":
            new_column = data[columns[0]] * data[columns[1]]

        if operation == "/":
            if len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]
            else:
                errors.append(columns[0])

        if operation == "//":
            if len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]
            else:
                errors.append(columns[0])

        if new_column is not None:
            name = columns[0] + operation + columns[1]
            data[name] = new_column
    except:
        pass

    return data, name, errors


def __generate_self_operator_column(operation, data, columns, parameter):
    new_column = []
    new_columns_name = []
    errors = []
    name = ""
    try:
        if operation == "ceil":
            for column in columns:
                new_column.append(data[column].apply(np.ceil))
                new_columns_name.append(column)

        if operation == "floor":
            for column in columns:
                new_column.append(data[column].apply(np.floor))
                new_columns_name.append(column)

        if operation == "fabs":
            for column in columns:
                new_column.append(data[column].apply(np.fabs))
                new_columns_name.append(column)

        if operation == "exp":
            for column in columns:
                new_column.append(data[column].apply(np.exp))
                new_columns_name.append(column)

        if operation == "pow":
            for column in columns:
                new_column.append(np.power(data[column], parameter))
                new_columns_name.append(column)

        if operation == "log":
            for column in columns:
                if len(data.loc[data[column] == 0]) == 0 and len(data.loc[data[column] < 0]) == 0:
                    new_column.append(np.log(data[column]))
                    new_columns_name.append(column)
                else:
                    errors.append(column)

        if operation == "log10":
            for column in columns:
                if len(data.loc[data[column] == 0]) == 0 and len(data.loc[data[column] < 0]) == 0:
                    new_column.append(np.log10(data[column]))
                    new_columns_name.append(column)
                else:
                    errors.append(column)

        if operation == "log2":
            for column in columns:
                if len(data.loc[data[column] == 0]) == 0 and len(data.loc[data[column] < 0]) == 0:
                    new_column.append(np.log2(data[column]))
                    new_columns_name.append(column)
                else:
                    errors.append(column)

        if new_column != 0:
            for index, column in enumerate(new_columns_name):
                name = operation + "_" + column
                if parameter is not None:
                    name = operation + f"({parameter})" + "_" + column
                data[name] = new_column[index]
    except:
        pass

    return data, name, errors

from .configuration_service import OPERATORS, SELF_OPERATORS
import numpy as np


def add_new_column(data, operation, columns, parameter):

    is_in_operators = (len(np.where(OPERATORS == operation)[0]) == 1)
    is_in_self_operators = (len(np.where(SELF_OPERATORS == operation)[0]) == 1)

    new_column = None
    try:
        if is_in_operators:
            if operation == "+":
                new_column = data[columns[0]] + data[columns[1]]

            if operation == "-":
                new_column = data[columns[0]] - data[columns[1]]

            if operation == "*":
                new_column = data[columns[0]] * data[columns[1]]

            if operation == "/" and len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]

            if operation == "//" and len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]
            name = ""
            if new_column is not None:
                name = columns[0] + operation + columns[1]
                data[name] = new_column

            return data, name
    except:
        pass

    new_column = []
    name = ""
    try:
        if is_in_self_operators:
            if operation == "ceil":
                for column in columns:
                    new_column.append(data[column].apply(np.ceil))

            if operation == "floor":
                for column in columns:
                    new_column.append(data[column].apply(np.floor))

            if operation == "fabs":
                for column in columns:
                    new_column.append(data[column].apply(np.fabs))

            if operation == "exp":
                for column in columns:
                    new_column.append(data[column].apply(np.exp))

            if operation == "pow":
                for column in columns:
                    new_column.append(np.power(data[column], parameter))

            if operation == "log":
                for column in columns:
                    if len(data.loc[data[column] == 0]) == 0:
                        new_column.append(np.log(data[column]))

            if operation == "log10":
                for column in columns:
                    if len(data.loc[data[column] == 0]) == 0:
                        new_column.append(np.log10(data[column]))

            if operation == "log2":
                for column in columns:
                    if len(data.loc[data[column] == 0]) == 0:
                        new_column.append(np.log2(data[column]))

            if new_column is not 0:
                for index, column in enumerate(columns):
                    name = operation + "_" + column
                    if parameter is not None:
                        name = operation + f"({parameter})" + "_" + column

                    data[name] = new_column[index]
    except:
        pass

    return data, name


def add_new_column_operation(data, operation, columns):
    is_in_operators = (len(np.where(OPERATORS == operation)[0]) == 1)

    new_column = None
    try:
        if is_in_operators:
            if operation == "+":
                new_column = data[columns[0]] + data[columns[1]]

            if operation == "-":
                new_column = data[columns[0]] - data[columns[1]]

            if operation == "*":
                new_column = data[columns[0]] * data[columns[1]]

            if operation == "/" and len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]

            if operation == "//" and len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]

            name = ""
            if new_column is not None:
                name = columns[0] + operation + columns[1]
                data[name] = new_column

            return data, name
    except:
        pass

    return None, None


def add_new_column_self_operation(data, operation, columns, parameter):

    is_in_self_operators = (len(np.where(SELF_OPERATORS == operation)[0]) == 1)

    new_column = []
    try:
        if is_in_self_operators:
            if operation == "ceil":
                for column in columns:
                    new_column.append(data[column].apply(np.ceil))

            if operation == "floor":
                for column in columns:
                    new_column.append(data[column].apply(np.floor))

            if operation == "fabs":
                for column in columns:
                    new_column.append(data[column].apply(np.fabs))

            if operation == "exp":
                for column in columns:
                    new_column.append(data[column].apply(np.exp))

            if operation == "pow":
                for column in columns:
                    new_column.append(np.power(data[column], parameter))

            if operation == "log":
                for column in columns:
                    if len(data.loc[data[column] == 0]) == 0:
                        new_column.append(np.log(data[column]))

            if operation == "log10":
                for column in columns:
                    if len(data.loc[data[column] == 0]) == 0:
                        new_column.append(np.log10(data[column]))

            if operation == "log2":
                for column in columns:
                    if len(data.loc[data[column] == 0]) == 0:
                        new_column.append(np.log2(data[column]))

            if new_column is not 0:
                for index, column in enumerate(columns):
                    name = operation + "_" + column
                    if parameter is not None:
                        name = operation + f"({parameter})" + "_" + column
                    data[name] = new_column[index]
        return data
    except:
        pass

    return None


def add_new_column_all_operation(data, operation, columns):
    is_in_operators = (len(np.where(OPERATORS == operation)[0]) == 1)

    new_column = None
    try:
        if is_in_operators:
            if operation == "+":
                new_column = data[columns[0]] + data[columns[1]]

            if operation == "-":
                new_column = data[columns[0]] - data[columns[1]]

            if operation == "*":
                new_column = data[columns[0]] * data[columns[1]]

            if operation == "/" and len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]

            if operation == "//" and len(data.loc[data[columns[1]] == 0]) == 0:
                new_column = data[columns[0]] / data[columns[1]]

            name = ""
            if new_column is not None:
                name = columns[0] + operation + columns[1]
                data[name] = new_column

            return data, name
    except:
        pass

    return None, None